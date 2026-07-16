import { useEffect, useRef, useState, type ReactNode } from "react";
import { io, type Socket } from "socket.io-client";
import { API_URL } from "../api/axios";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../components/Toast";
import { SocketContext } from "./socket.context";
import { queryClient } from "../utils/queryClient";
import type {
  Drop,
  Reservation,
  Activity,
  StockUpdatePayload,
  PurchaseCreatedPayload,
} from "../types";

export function SocketProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  const toast = useToast();
  const [socket, setSocket] = useState<Socket | null>(null);
  const toastRef = useRef(toast.showToast);

  useEffect(() => {
    toastRef.current = toast.showToast;
  }, [toast]);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setSocket(null);
      return;
    }

    const newSocket: Socket = io(API_URL, {
      auth: { userId: user.id },
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 2000,
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Socket connected");
    });

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    newSocket.on("drop:stock_updated", (payload: StockUpdatePayload) => {
      queryClient.setQueryData(["drops"], (oldData: Drop[] | undefined) => {
        if (!oldData) return oldData;

        const drop = oldData.find((d) => d.id === payload.dropId);
        const stockValue = payload.stock ?? 0;
        
        if (drop) {
          toastRef.current(
            `Stock updated: "${drop.name}" now has ${stockValue} units available`,
            "info",
          );
        }

        return oldData.map((drop) =>
          drop.id === payload.dropId
            ? { ...drop, availableStock: stockValue }
            : drop,
        );
      });

      queryClient.invalidateQueries({ queryKey: ["drops"] });
    });

    newSocket.on("reservation:created", () => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
    });

    newSocket.on("reservation:expired", () => {
      queryClient.setQueryData(
        ["reservations"],
        (oldData: { data: Reservation[] } | undefined) => {
          if (!oldData?.data) return oldData;
          return {
            ...oldData,
            data: oldData.data.filter((r) => r.status === "ACTIVE"),
          };
        },
      );
      toastRef.current("Your reservation has expired", "error");
    });

    newSocket.on("purchase:completed", () => {
      queryClient.setQueryData(
        ["reservations"],
        (oldData: { data: Reservation[] } | undefined) => {
          if (!oldData?.data) return oldData;
          return {
            ...oldData,
            data: oldData.data.map((r) => ({
              ...r,
              status: "PURCHASED" as const,
            })),
          };
        },
      );
      toastRef.current("Purchase completed successfully!", "success");
    });

    newSocket.on(
      "activity:purchase_created",
      (payload: PurchaseCreatedPayload) => {
        queryClient.setQueryData(
          ["activity"],
          (oldData: { data: Activity[] } | undefined) => {
            if (!oldData?.data) return oldData;
            const newActivity: Activity = {
              purchaseId: payload.purchaseId,
              username: payload.username,
              dropId: payload.dropId,
              dropName: payload.dropName,
              purchasedAt: payload.purchasedAt,
            };
            return {
              ...oldData,
              data: [newActivity, ...oldData.data].slice(0, 3),
            };
          },
        );
      },
    );

    return () => {
      newSocket.off("connect");
      newSocket.off("disconnect");
      newSocket.off("drop:stock_updated");
      newSocket.off("reservation:created");
      newSocket.off("reservation:expired");
      newSocket.off("purchase:completed");
      newSocket.off("activity:purchase_created");
      newSocket.disconnect();
    };
  }, [isAuthenticated, user]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
