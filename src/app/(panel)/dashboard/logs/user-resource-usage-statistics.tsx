import { StatisticsGroup, StatisticsItem } from "@/components/custom/statistics";
import { api } from "@/trpc/server";

export async function UserUsageStatistics({ userId }: { userId?: string }) {
  const result = await api.resourceLog.sumLogsInDurationWindowsByUserId({
    unit: "TOKEN",
    durationWindows: ["3h", "1d", "7d", "30d"],
    userId, // by default is the current user
  });

  return (
    <StatisticsGroup className="md:grid-cols-4">
      {result.map((item) => (
        <StatisticsItem
          key={item.durationWindow}
          label={`Last ${item.durationWindow}`}
          value={[`${item.count}`, `${item.value}`]}
          suffix={["times", "tokens"]}
        />
      ))}
    </StatisticsGroup>
  );
}