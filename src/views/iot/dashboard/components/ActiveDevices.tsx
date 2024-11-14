// Chakra imports
import { Box, Flex, Text, Icon, useColorModeValue, Checkbox, Table, Thead, Th, Tr, Tbody, Td } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import IconBox from 'components/icons/IconBox';

import { DevObj } from 'data/deviceData';

// Assets
import * as React from 'react';

import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable
} from '@tanstack/react-table';




const columnHelper = createColumnHelper<DevObj>();


export default function Conversion(props: { tableData: DevObj[] }) {
	const { tableData } = props;
	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const boxBg = useColorModeValue('secondaryGray.300', 'navy.700');
	const brandColor = useColorModeValue('brand.500', 'brand.400');




	if(tableData === undefined){
		return(
			<Card p='100px' alignItems='center' flexDirection='column' w='100%' gap='20px'>
				  <Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%' gap='20px'>
				  </Text>
				  <Text>
					Data Fetching error
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

	const using = tableData.filter((row)=> row.status);

	if(using.length === 0){
		return (
			<Card p='100px' alignItems='center' flexDirection='column' w='100%' gap='20px'>
			<Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%' gap='20px'>
				Active Devices
			</Text>
			<Text>
			No active devices
			</Text>
			</Card>
		)
	}
	else{
		const columns = [
			columnHelper.accessor('name', {
				id: 'device',
				header: () => (<Text >  </Text>),
				cell: contents => <Text > {contents.getValue()} </Text>
			})
		]
		const [data, setData] = React.useState(() => [ ...using ]);
		const table = useReactTable({
			columns,
			data,
			getCoreRowModel: getCoreRowModel(),
		})
		return (
			<Card p='100px' alignItems='center' flexDirection='column' w='100%' gap='20px'>
			<Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
				Active Devices
			</Text>
			
			<Table variant='simple'>
			<Thead>
				{table.getHeaderGroups().map((headerGroup)  => (
					<Tr key={headerGroup.id}>
						{headerGroup.headers.map((header) => {
							return (
								<Th
									key={header.id} >
									{flexRender(header.column.columnDef.header, header.getContext())}											
								</Th>
							);
						})}
					</Tr>
				))}
			</Thead>
			<Tbody>
				{table.getRowModel().rows.map((row) => {
					return (
						<Tr key={row.id}>
							{row.getVisibleCells().map((cell:any) => {
								return (
									<Td key = {cell.id} >
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</Td>
								);
							})}
						</Tr>
					)
				})}

			</Tbody>
			</Table>
			
				
			</Card>
		)
	}

    }