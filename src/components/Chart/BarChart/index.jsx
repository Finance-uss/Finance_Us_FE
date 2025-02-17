import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { ChartContainer, ChartWrapper } from '../../../styles/Chart/BarChart/style';
import { getPeriodStatisticsData, getPeriodDetails } from '../../../api/periodStatistics';

Chart.register(...registerables);

const BarChart = ({ token, startDate, endDate, type }) => {
    const [periodData, setPeriodData] = useState([]);
    const [selectedMonthData, setSelectedMonthData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);
    const [clickedBarIndex, setClickedBarIndex] = useState(null);

    useEffect(() => {
        const fetchStatisticsData = async () => {
            try {
                const data = await getPeriodStatisticsData(token, startDate.year, startDate.month, endDate.year, endDate.month, type);
                setPeriodData(data.result.monthlyData); 
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchStatisticsData();
    }, [token, startDate, endDate, type]); 

    const getFilteredLabels = () => {
        const labels = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
        return labels.slice(startDate.month - 1, endDate.month); 
    };

    const getFilteredMonthlyData = () => {
        const filteredData = Array(endDate.month - startDate.month + 1).fill(0);
        periodData.forEach(data => {
            const monthIndex = data.month - startDate.month; 
            if (monthIndex >= 0 && monthIndex < filteredData.length) {
                filteredData[monthIndex] += data.totalMoney;
            }
        });
        return filteredData;
    };

    const filteredMonthlyData = getFilteredMonthlyData();
    const filteredLabels = getFilteredLabels();

    const barChartData = {
        labels: filteredLabels,
        datasets: [
            {
                label: type === 'expense' ? '지출' : '수익',
                data: filteredMonthlyData,
                backgroundColor: filteredLabels.map((_, index) => 
                  index === clickedBarIndex ? '#FFB55D' : '#142755' 
                ),
                borderWidth: 1,
                borderRadius: 5,
                barThickness: 20,
            },
        ],
    };

    const barChartOptions = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                display: false,
                ticks: {
                    color: '#b4b4b4',
                },
                grid: {
                    display: false,
                },
            },
            x: {
                display: true,
                ticks: {
                    display: true,
                    font: {
                        size: 16,
                        color: '#b4b4b4',
                    },
                },
                grid: {
                    display: false,
                },
            },
        },
        plugins: {
          legend: {
              display: false,
          },
          tooltip: {
              enabled: false, 
          },
        },
    };

    const handleBarClick = async (event, elements) => {
        if (elements.length > 0) {
            const index = elements[0].index; 
            const selectedMonth = startDate.month - 1 + index; 

            setClickedBarIndex(index);

            try {
                const monthData = await getPeriodDetails(token, startDate.year, selectedMonth + 1, type);
                
                if (type === 'expense') {
                  
                    const sortedDetails = monthData.result.details.sort((a, b) => a.day - b.day);
                    setSelectedMonthData(sortedDetails); 
                    setTotalAmount(monthData.result.totalMoney); 
                } else {
              
                    setSelectedMonthData([]); 
                    setTotalAmount(0); 
                }
            } catch (error) {
                console.error("세부 데이터 조회 실패:", error);
            }
        }
    };

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>오류 발생: {error.message}</p>;

    return (
        <>
            <ChartContainer>
                <ChartWrapper>
                    <Bar 
                        data={barChartData} 
                        options={{ ...barChartOptions, onClick: handleBarClick }} 
                    />
                </ChartWrapper>
            </ChartContainer>

            {selectedMonthData && selectedMonthData.length > 0 && type === 'expense' && (
                <div>
                    <h3>{startDate.year}년 {startDate.month + clickedBarIndex}월 총 지출: {totalAmount} 원</h3>
                    <ul>
                        {selectedMonthData.map((data, index) => (
                            <li key={index}>
                                {data.day}일 - {data.title}: {data.amount} 원
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {type === 'income' && selectedMonthData && selectedMonthData.length === 0 && (
                <div>
                    <h3>{startDate.year}년 {startDate.month + clickedBarIndex}월 총 수익: 0 원</h3>
                    <p>이 달의 수익 데이터는 없습니다.</p>
                </div>
            )}
        </>
    );
};

export default BarChart;
