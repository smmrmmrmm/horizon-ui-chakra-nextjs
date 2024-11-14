// Chakra imports
import { Box, Flex, Text, Icon, useColorModeValue, Checkbox, Table, Thead, Th, Tr, Tbody, Td, Spacer } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import IconBox from 'components/icons/IconBox';

import * as React from 'react';

import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable
} from '@tanstack/react-table';

// Assets
import { MdCheckBox, MdDragIndicator } from 'react-icons/md';
import { AnyAaaaRecord } from 'dns';

import { NotRow} from 'data/notificationData';


const columnHelper = createColumnHelper<NotRow>();

function HoursnMins(date: Date){
	return(date.getHours() + ':' + date.getMinutes())
};


export default function Conversion(props: { tableData: NotRow[] }) {
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
				  Data fetching error
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

	const using = (tableData.filter((row)=> row.state)).slice(0,5);

	if(using.length === 0){
		return (
			<Card p='100px' alignItems='center' flexDirection='column' w='100%' gap='20px'>
			<Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
				Notification Center
			</Text>
			<Text>
				No new notifications
			</Text>
			</Card>
		)
	}
	else{
		const columns = [
			columnHelper.accessor('type', {
				id: 'notitype',
				header: () => (<Text> Type </Text>),
				cell: contents => <Text > {contents.getValue()} </Text>
			}),
			columnHelper.accessor('thing', {
				id: 'thing',
				header: () => (<Text> Origin </Text>),
				cell: contents => <Text > {contents.getValue()} </Text>
			}),
			columnHelper.accessor('message', {
				id: 'message',
				header: () => (<Text > Message </Text>),
				cell: contents => <Text > {contents.getValue()} </Text>
			}),
			columnHelper.accessor('time', {
				id: 'time',
				header: () => (<Text > Time </Text>),
				cell: contents => <Text > {HoursnMins(contents.getValue())} </Text>
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
				Notification Center
			</Text>
			<Table variant='striped'>
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

