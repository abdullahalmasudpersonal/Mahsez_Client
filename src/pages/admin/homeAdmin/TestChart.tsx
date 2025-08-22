import ReactApexChart from "react-apexcharts";


const TestChart = () => {
    const options = {
        // dataLabels: {
        //     enabled: false,
        // },
        chart: {
            type: "bar" as const,
            // stacked: false,
            toolbar: { show: false },
        },
        xaxis: {
            categories: ["Mon", "Tue", "Wed", "Thu", "Fri"], // X-axis label
        },
    };

    const series = [
        {
            name: 'series1',
            data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
            name: 'series2',
            data: [11, 32, 45, 32, 34, 52, 41]
        }
    ]
    return (
        <div>
            <ReactApexChart
                options={options}
                series={series}
                type="bar"
            />
        </div>
    );
};

export default TestChart;