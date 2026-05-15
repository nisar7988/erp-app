import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Premium Fees Screen
 * 
 * Features:
 * - Financial Summary Card
 * - Categorized Fee Breakdown
 * - Payment History List
 */
export default function FeesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-surface">
      <ScrollView 
        className="flex-1 px-6" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="mt-4">
          <Text className="text-2xl font-bold text-on-surface">Fee Management</Text>
        </View>

        {/* --- Financial Summary --- */}
        <View className="mt-8 bg-on-surface p-6 rounded-[40px] shadow-xl shadow-black/20">
          <View className="flex-row justify-between items-center">
            <Text className="text-white/60 font-bold uppercase tracking-widest text-[10px]">Total Outstanding</Text>
            <View className="bg-white/10 px-2 py-1 rounded-lg">
              <Text className="text-white/80 text-[10px] font-bold">FALL 2023</Text>
            </View>
          </View>
          <Text className="text-white text-4xl font-bold mt-2">$1,250.00</Text>
          
          <View className="flex-row gap-4 mt-6">
            <View className="flex-1 bg-white/10 p-3 rounded-2xl">
              <Text className="text-white/50 text-[10px] font-bold uppercase">Paid</Text>
              <Text className="text-white text-lg font-bold">$4,500</Text>
            </View>
            <View className="flex-1 bg-primary p-3 rounded-2xl">
              <Text className="text-white/50 text-[10px] font-bold uppercase">Due Date</Text>
              <Text className="text-white text-lg font-bold">Oct 30</Text>
            </View>
          </View>

          <TouchableOpacity className="bg-white mt-6 py-4 rounded-2xl items-center shadow-lg shadow-white/10">
            <Text className="text-on-surface font-bold">Pay Now</Text>
          </TouchableOpacity>
        </View>

        {/* --- Fee Breakdown --- */}
        <View className="mt-10">
          <Text className="text-[10px] font-bold text-on-surface-variant tracking-widest mb-4 uppercase">Fee Breakdown</Text>
          <View className="gap-3">
            <FeeItem title="Tuition Fee" amount="$3,500.00" status="Paid" date="Aug 15, 2023" isPaid />
            <FeeItem title="Library Fee" amount="$250.00" status="Paid" date="Aug 15, 2023" isPaid />
            <FeeItem title="Lab Maintenance" amount="$750.00" status="Pending" date="Due Oct 30" />
            <FeeItem title="Exam Registration" amount="$500.00" status="Pending" date="Due Oct 30" />
          </View>
        </View>

        {/* --- Recent History --- */}
        <View className="mt-10">
          <Text className="text-[10px] font-bold text-on-surface-variant tracking-widest mb-4 uppercase">Recent Transactions</Text>
          <View className="bg-surface-dim border border-outline rounded-[32px] overflow-hidden">
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
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function FeeItem({ title, amount, status, date, isPaid }: any) {
  return (
    <View className="bg-surface border border-outline rounded-3xl p-4 flex-row items-center justify-between">
      <View className="flex-row items-center gap-4">
        <View className={`w-12 h-12 rounded-2xl items-center justify-center ${isPaid ? 'bg-success/10' : 'bg-primary/10'}`}>
          <Ionicons name={isPaid ? "checkmark-circle" : "time"} size={24} color={isPaid ? "#16A34A" : "#E66C19"} />
        </View>
        <View>
          <Text className="text-sm font-bold text-on-surface">{title}</Text>
          <Text className="text-[10px] text-on-surface-variant mt-1">{date}</Text>
        </View>
      </View>
      <View className="items-end">
        <Text className="text-sm font-bold text-on-surface">{amount}</Text>
        <Text className={`text-[10px] font-bold mt-1 ${isPaid ? 'text-success' : 'text-primary'}`}>{status.toUpperCase()}</Text>
      </View>
    </View>
  );
}

function TransactionItem({ title, date, amount, id, isLast }: any) {
  return (
    <View className={`p-5 flex-row items-center justify-between ${!isLast ? 'border-b border-outline/50' : ''}`}>
      <View className="flex-row items-center gap-4">
        <View className="w-10 h-10 rounded-xl bg-surface items-center justify-center border border-outline">
          <Ionicons name="receipt-outline" size={18} color="#78716C" />
        </View>
        <View>
          <Text className="text-sm font-bold text-on-surface">{title}</Text>
          <Text className="text-[10px] text-on-surface-variant mt-0.5">{id} • {date}</Text>
        </View>
      </View>
      <Text className="text-sm font-bold text-on-surface">{amount}</Text>
    </View>
  );
}
