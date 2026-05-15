import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ScreenWrapper } from "../../components/layout/ScreenWrapper";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";

/**
 * Premium Fees Screen
 * Refactored to use modular architecture.
 */
export default function FeesScreen() {
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
        className="mt-8  p-6 rounded-[40px] shadow-xl shadow-black/20"
      >
        <View className="flex-row justify-between items-center">
          <Text className=" font-bold uppercase tracking-widest text-[10px]">
            Total Outstanding
          </Text>
          <Badge
            label="FALL 2023"
            variant="surface"
            className="bg-white/10 border-white/10"
          />
        </View>
        <Text className=" text-4xl font-bold mt-2">$1,250.00</Text>

        <View className="flex-row gap-4 mt-6">
          <View className="flex-1 bg-white/10 p-3 rounded-2xl">
            <Text className="text-white/50 text-[10px] font-bold uppercase">
              Paid
            </Text>
            <Text className="text-lg font-bold">$4,500</Text>
          </View>
          <View className="flex-1 bg-primary p-3 rounded-2xl">
            <Text className="text-white text-[10px] font-bold uppercase">
              Due Date
            </Text>
            <Text className="text-white text-lg font-bold">Oct 30</Text>
          </View>
        </View>

        <TouchableOpacity className="bg-primary mt-6 py-4 rounded-2xl items-center shadow-lg shadow-white/10">
          <Text className="text-white font-bold">Pay Now</Text>
        </TouchableOpacity>
      </Card>

      {/* --- Fee Breakdown --- */}
      <View className="mt-10">
        <Text className="text-[10px] font-bold text-on-surface-variant tracking-widest mb-4 uppercase">
          Fee Breakdown
        </Text>
        <View className="gap-3">
          <FeeItem
            title="Tuition Fee"
            amount="$3,500.00"
            status="Paid"
            date="Aug 15, 2023"
            isPaid
          />
          <FeeItem
            title="Library Fee"
            amount="$250.00"
            status="Paid"
            date="Aug 15, 2023"
            isPaid
          />
          <FeeItem
            title="Lab Maintenance"
            amount="$750.00"
            status="Pending"
            date="Due Oct 30"
          />
          <FeeItem
            title="Exam Registration"
            amount="$500.00"
            status="Pending"
            date="Due Oct 30"
          />
        </View>
      </View>

      {/* --- Recent History --- */}
      <View className="mt-10">
        <Text className="text-[10px] font-bold text-on-surface-variant tracking-widest mb-4 uppercase">
          Recent Transactions
        </Text>
        <Card
          variant="dim"
          className="bg-surface-dim border border-outline rounded-[32px] overflow-hidden"
        >
          <TransactionItem
            title="Tuition Installment 1"
            date="Aug 15, 2023"
            amount="-$2,000.00"
            id="TXN-99210"
          />
          <TransactionItem
            title="Library & Sports Fee"
            date="Aug 10, 2023"
            amount="-$500.00"
            id="TXN-99185"
            isLast
          />
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
