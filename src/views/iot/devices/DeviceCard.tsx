// Chakra imports
import { Box, Flex, Text, Icon, useColorModeValue, Checkbox, Table, Thead, Th, Tr, Tbody, Td, Spacer } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
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

import { NotdevObj } from 'data/notdevData';

import { Device } from 'usersanddevices/deviceobjects';
import { DevObj } from 'data/deviceData';

//




const columnHelper = createColumnHelper<NotdevObj>();

function HoursnMins(date: Date){
	return(date.getHours() + ':' + date.getMinutes())
};

export default function Conversion(props: { device : Device, deviceData : DevObj, notifications : NotdevObj[] }) {
	const { device, deviceData, notifications } = props
	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const boxBg = useColorModeValue('secondaryGray.300', 'navy.700');
	const brandColor = useColorModeValue('brand.500', 'brand.400');

    if(notifications === undefined || device === undefined || deviceData === undefined){
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

	else if(notifications === null || device === null || deviceData === null){
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
	console.log(notifications.length)

	const using = notifications.filter((row) => row.state && row.device === device);
    
    if(using.length === 0){
		return (
			<Card p='100px' alignItems='center' flexDirection='column' w='100%' gap='20px'>
			<Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
                {device.name}
			</Text>
            <Text> 
                Active: {JSON.stringify(deviceData.status)}
            </Text>
			<Text>
				Device Usage: {JSON.stringify(deviceData.watt)} watts
			</Text>
			<Text>
				No new notifications
			</Text>
			</Card>
		)
	}

    else{
		const columns = [
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
                {device.name}
			</Text>
            <Text> 
                Active: {deviceData.status}
            </Text>
            <Text> 
                Device Notifications:
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


};

