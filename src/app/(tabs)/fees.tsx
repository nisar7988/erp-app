import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ScreenWrapper } from "../../components/layout/ScreenWrapper";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { useProfile, useFees } from "../../hooks/useStudentData";
import GlobalLoaderOverlay from "../../components/common/GlobalLoaderOverlay";

/**
 * Premium Fees Screen
 * Refactored to use modular architecture and dynamic API data.
 */
export default function FeesScreen() {
  const { data: profile, isLoading: isProfileLoading } = useProfile();
  const studentId = profile?.studentProfile?.id;
  const { data: fees = [], isLoading: isFeesLoading } = useFees(studentId);

  const isLoading = isProfileLoading || isFeesLoading;

  if (isLoading) {
    return <GlobalLoaderOverlay text="Loading Fees..." />;
  }

  const totalOutstanding = fees.reduce(
    (acc: number, fee: any) => acc + Number(fee.pendingAmount || 0),
    0,
  );
  const totalPaid = fees.reduce(
    (acc: number, fee: any) => acc + Number(fee.paidAmount || 0),
    0,
  );

  const pendingFees = fees.filter((f: any) => f.status !== "PAID");
  const nextDueDate =
    pendingFees.length > 0
      ? new Date(
          Math.min(
            ...pendingFees.map((f: any) => new Date(f.dueDate).getTime()),
          ),
        ).toLocaleDateString("en-US", { month: "short", day: "numeric" })
      : "N/A";

  const transactions = fees
    .flatMap((fee: any) => fee.payments || [])
    .sort(
      (a: any, b: any) =>
        new Date(b.paidAt).getTime() - new Date(a.paidAt).getTime(),
    )
    .slice(0, 3);

  return (
    <ScreenWrapper>
      <View className="mt-4">
        <Text className="text-2xl font-bold text-on-surface">
          Fee Management
        </Text>
      </View>

      {/* --- Financial Summary --- */}
      <Card
        variant="dim"
        className="mt-8 p-6 rounded-[40px] shadow-xl shadow-black/20"
      >
        <View className="flex-row justify-between items-center">
          <Text className="font-bold uppercase tracking-widest text-[10px]">
            Total Outstanding
          </Text>
          <Badge
            label="CURRENT"
            variant="surface"
            className="bg-white/10 border-white/10"
          />
        </View>
        <Text className="text-4xl font-bold mt-2">Rs.{totalOutstanding}</Text>

        <View className="flex-row gap-4 mt-6">
          <View className="flex-1 bg-outline/60 p-3 rounded-2xl">
            <Text className="text-green-500 text-[7px] font-bold uppercase">
              Paid
            </Text>
            <Text className="text-lg font-bold">Rs.{totalPaid}</Text>
          </View>
          <View className="flex-1 bg-primary p-3 rounded-2xl">
            <Text className="text-white text-[10px] font-bold uppercase">
              Due Date
            </Text>
            <Text className="text-white text-lg font-bold">{nextDueDate}</Text>
          </View>
        </View>

        {totalOutstanding > 0 && (
          <TouchableOpacity className="bg-primary mt-6 py-4 rounded-2xl items-center shadow-lg shadow-white/10">
            <Text className="text-white font-bold">Pay Now</Text>
          </TouchableOpacity>
        )}
      </Card>

      {/* --- Fee Breakdown --- */}
      <View className="mt-10">
        <Text className="text-[10px] font-bold text-on-surface-variant tracking-widest mb-4 uppercase">
          Fee Breakdown
        </Text>
        <View className="gap-3">
          {fees.length > 0 ? (
            fees.map((fee: any) => (
              <FeeItem
                key={fee.id}
                title={fee.feeStructure?.title || "Fee"}
                amount={`$${Number(fee.amount).toFixed(2)}`}
                status={
                  fee.status === "PAID"
                    ? "Paid"
                    : fee.status === "PARTIAL"
                      ? "Partial"
                      : "Pending"
                }
                date={
                  fee.status === "PAID"
                    ? "Paid"
                    : `Due ${new Date(fee.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
                }
                isPaid={fee.status === "PAID"}
              />
            ))
          ) : (
            <Text className="text-on-surface-variant text-center mt-4">
              No fees found.
            </Text>
          )}
        </View>
      </View>

      {/* --- Recent History --- */}
      <View className="mt-10 mb-10">
        <Text className="text-[10px] font-bold text-on-surface-variant tracking-widest mb-4 uppercase">
          Recent Transactions
        </Text>
        <Card
          variant="dim"
          className="bg-surface-dim border border-outline rounded-[32px] overflow-hidden"
        >
          {transactions.length > 0 ? (
            transactions.map((txn: any, index: number) => (
              <TransactionItem
                key={txn.id}
                title={`Payment via ${txn.method || "Card"}`}
                date={new Date(txn.paidAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
                amount={`-$${Number(txn.amount).toFixed(2)}`}
                id={txn.referenceNo || txn.id.split("-")[0].toUpperCase()}
                isLast={index === transactions.length - 1}
              />
            ))
          ) : (
            <View className="p-6 items-center">
              <Text className="text-on-surface-variant text-sm">
                No recent transactions.
              </Text>
            </View>
          )}
        </Card>
      </View>
    </ScreenWrapper>
  );
}

function FeeItem({ title, amount, status, date, isPaid }: any) {
  return (
    <Card className="p-4 flex-row items-center justify-between">
      <View className="flex-row items-center gap-4">
        <View
          className={`w-12 h-12 rounded-2xl items-center justify-center ${isPaid ? "bg-success/10" : "bg-primary/10"}`}
        >
          <Ionicons
            name={isPaid ? "checkmark-circle" : "time"}
            size={24}
            color={isPaid ? "#16A34A" : "#E66C19"}
          />
        </View>
        <View>
          <Text className="text-sm font-bold text-on-surface">{title}</Text>
          <Text className="text-[10px] text-on-surface-variant mt-1">
            {date}
          </Text>
        </View>
      </View>
      <View className="items-end">
        <Text className="text-sm font-bold text-on-surface">{amount}</Text>
        <Badge label={status} variant={isPaid ? "success" : "primary"} />
      </View>
    </Card>
  );
}

function TransactionItem({ title, date, amount, id, isLast }: any) {
  return (
    <View
      className={`p-5 flex-row items-center justify-between ${!isLast ? "border-b border-outline/50" : ""}`}
    >
      <View className="flex-row items-center gap-4">
        <View className="w-10 h-10 rounded-xl bg-surface items-center justify-center border border-outline">
          <Ionicons name="receipt-outline" size={18} color="#78716C" />
        </View>
        <View>
          <Text className="text-sm font-bold text-on-surface">{title}</Text>
          <Text className="text-[10px] text-on-surface-variant mt-0.5">
            {id} • {date}
          </Text>
        </View>
      </View>
      <Text className="text-sm font-bold text-on-surface">{amount}</Text>
    </View>
  );
}
