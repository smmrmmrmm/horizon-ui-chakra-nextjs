// Chakra imports
import { Box, Flex, Text, Select, useColorModeValue, useForceUpdate } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import PieChart from 'components/charts/PieChart';
// import { pieChartData, pieChartOptions } from 'variables/charts';
import { VSeparator } from 'components/separator/Separator';
import { useState } from 'react'
import PieMenu from 'components/menu/PieMenu'
import { ApexOptions } from "apexcharts";

import { DevObj } from 'data/deviceData';

type ApexGeneric = ApexOptions & any;

type display = 'device' | 'room' | 'type' | 'user';




function filter(bigdata:DevObj[],filtering:display){
	var totals : number[] = [];
	var labels : string[] = [];
	switch(filtering){
		case 'device':
			bigdata.forEach(row => {
				totals.push(row.watt);
				labels.push(row.name);
			});
			return({totals:totals,labels:labels, title:'device'});
			break;
		case 'room':
			bigdata.forEach(row =>  {
				const i = labels.findIndex(y => y === row.room);
				if(i === -1){
					totals.push(row.watt);
					labels.push(row.room);
				}
				else{
					totals[i] += row.watt;
				}
			});
			return({totals:totals,labels:labels, title:'room'});
			break;
		case 'type':
			bigdata.forEach(row =>  {
				const i = labels.findIndex(y => y === row.type);
				if(i === -1){
					totals.push(row.watt);
					labels.push(row.type);
				}
				else{
					totals[i] += row.watt;
				}
			});
			return({totals:totals,labels:labels, title:'type'});
			break;
		case 'user':
			bigdata.forEach(row =>  {
				const i = labels.findIndex(y => y === row.user);
				if(i === -1){
					totals.push(row.watt);
					labels.push(row.user);
				}
				else{
					totals[i] += row.watt;
				}
			});
			return({totals:totals,labels:labels, title:'user'});
			break;			
	}
}


export default function Conversion(props: {tableData: DevObj[]}) {
	const { tableData } = props;
	const [display, setDisplay] = useState<display>('device');

    const textColor = useColorModeValue('secondaryGray.900', 'white');
	const boxBg = useColorModeValue('secondaryGray.300', 'navy.700');
	const brandColor = useColorModeValue('brand.500', 'brand.400');

	
	function changeDisplay(state:display) {
		setDisplay(state);
	}

	
	if(tableData === undefined){
		return(
			<Card p='100px' alignItems='center' flexDirection='column' w='100%' gap='20px'>
				  <Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%' gap='20px'>
				  </Text>
				  <Text>
				  Data Fetching Error
				  </Text>
				  </Card>
		  )
	}

	else if(tableData === null ){
		return(
			<Card p='100px' alignItems='center' flexDirection='column' w='100%' gap='20px'>
				  <Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%' gap='20px'>
				  </Text>
				  <Text>
				  loading
				  </Text>
				  </Card>
		  )
	};

	var data = filter(tableData,display);
	var pieChartOptions: ApexGeneric = {
	labels: data.labels,
	chart: {
		width: "100px",
	  },
	  states: {
		hover: {
		  filter: {
			type: "none",
		  },
		},
	  },
	  legend: {
		show: false,
	  },
	  dataLabels: {
		enabled: false,
	  },
	  hover: { mode: null },
	  plotOptions: {
		donut: {
		  expandOnClick: false,
		  donut: {
			labels: {
			  show: false,
			},
		  },
		},
	  },
	}


	// return(
	// 	<Card p='90px' alignItems='center' flexDirection='column' w='100%'> 
	// 			<Flex px='25px' mb="8px" justifyContent='space-between' align='center'>
	// 				<Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
	// 					Power Consumption
	// 				</Text>
	// 				<PieMenu changestate={changeDisplay} />
	// 				<Text > {data.title} </Text>
	// 				<PieChart h='100%' w='100%' chartData={data.totals} chartOptions={pieChartOptions} />
	// 			</Flex>
			
	// 		</Card>

	// )

	if (display == 'device'){

		return (
			<Card p='90px' alignItems='center' flexDirection='column' w='100%'> 
				<Flex px='25px' mb="8px" justifyContent='space-between' align='center'>
					<Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
						Power Consumption
					</Text>
					<PieMenu changestate={changeDisplay} />
					</Flex>
					<PieChart h='100%' w='100%' chartData={data.totals} chartOptions={pieChartOptions} />
					Devices
			
			</Card>
		)
	}
	else if (display == 'room'){
		var data = filter(tableData,display);
		return (
			<Card p='90px' alignItems='center' flexDirection='column' w='100%'> 
				<Flex px='25px' mb="8px" justifyContent='space-between' align='center'>
					<Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
						Power Consumption
					</Text>
					<PieMenu changestate={changeDisplay} />
					</Flex>
					<PieChart h='100%' w='100%' chartData={data.totals} chartOptions={pieChartOptions} />
					Room
			
			</Card>
		)
	}
	else if (display == 'type'){
		return (
			<Card p='90px' alignItems='center' flexDirection='column' w='100%'> 
				<Flex px='25px' mb="8px" justifyContent='space-between' align='center'>
					<Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
						Power Consumption
					</Text>
					<PieMenu changestate={changeDisplay} />
					</Flex>
					<PieChart h='100%' w='100%' chartData={data.totals} chartOptions={pieChartOptions} />
					Type
			
			</Card>
		)
	}
	else{
		return (
			<Card p='90px' alignItems='center' flexDirection='column' w='100%'> 
				<Flex px='25px' mb="8px" justifyContent='space-between' align='center'>
					<Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
						Power Consumption
					</Text>
					<PieMenu changestate={changeDisplay} />
					</Flex>
					<PieChart h='100%' w='100%' chartData={data.totals} chartOptions={pieChartOptions} />
					User
			
			</Card>
		)
	}


}
	