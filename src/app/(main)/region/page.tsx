import ChartToggle from "@/features/prediction/components/ChartToggle"
import RegionalTable from "@/features/region/components/regionaltable"

export default function RegionalPage() {
	return (
		<div className="flex min-h-screen w-full flex-col items-center gap-4 p-4 pb-8">
			<section className="w-full">
				<ChartToggle />
			</section>

			<section className="w-full">
				<h1 className="mb-4 text-xl font-bold">지역별 발전량 예측</h1>
				<RegionalTable />
			</section>
		</div>
	)
}
