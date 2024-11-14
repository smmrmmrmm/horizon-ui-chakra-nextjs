// Chakra imports
import { Box, Flex, Text, Icon, useColorModeValue, Checkbox, Table, Thead, Th, Tr, Tbody, Td, Spacer } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import { NotdevObj } from 'data/notdevData';
import { NotsetObj } from 'data/notsetData';

import userList from 'usersanddevices/userobject';
import deviceList from 'usersanddevices/deviceobjects';

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
import { table } from 'console';

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function HoursnMins(date: Date){
	return(date.getDay() + ' ' + months[date.getMonth()] + ' ' + date.getHours() + ':' + date.getMinutes())
};



const columnHelperdev = createColumnHelper<NotdevObj>();
const columnHelperset = createColumnHelper<NotsetObj>();


export function Dev(props: { tableData: NotdevObj[] }) {
	const { tableData} = props;
	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const boxBg = useColorModeValue('secondaryGray.300', 'navy.700');
	const brandColor = useColorModeValue('brand.500', 'brand.400');

	if(tableData === undefined){
		return(
			<Card p='100px' alignItems='center' flexDirection='column' w='100%' gap='20px'>
				  <Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%' gap='20px'>
					  Active Devices
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

	const using = ([...tableData].sort((a,b)=> b.time.getTime() - a.time.getTime()))

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
			// columnHelper.accessor('type', {
			// 	id: 'notitype',
			// 	header: () => (<Text> Type </Text>),
			// 	cell: contents => <Text > {contents.getValue()} </Text>
			// }),
			columnHelperdev.accessor('device.name', {
				id: 'device',
				header: () => (<Text > Device </Text>),
				cell: contents => <Text > {contents.getValue()} </Text>
			}),
			columnHelperdev.accessor('message', {
				id: 'info',
				header: () => (<Text > Message </Text>),
				cell: contents => <Text > {contents.getValue()} </Text>
			}),
			columnHelperdev.accessor('time', {
				id: 'time',
				header: () => (<Text > Time </Text>),
				cell: contents => <Text > {HoursnMins(contents.getValue())} </Text>
			}),
            columnHelperdev.accessor('state',  {
                id: 'state',
                header: () => (<Text > Read</Text>),
                cell: contents => <Checkbox defaultValue={Number(contents.getValue())}> </Checkbox>
            })
		]
		const [data, setData] = React.useState(() => [ ...using ]);
		const table = useReactTable({
			columns,
			data,
			getCoreRowModel: getCoreRowModel(),
		})
		return (
			<Card alignItems='center' flexDirection='column' w='100%' gap='20px'>
			<Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
				Device Notifications
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


	export function Set(props: { tableData: NotsetObj[] }) {
		const { tableData} = props;
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
		
		const using = ([...tableData].sort((a,b)=> b.time.getTime() - a.time.getTime()))
	
	
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
				// columnHelper.accessor('type', {
				// 	id: 'notitype',
				// 	header: () => (<Text> Type </Text>),
				// 	cell: contents => <Text > {contents.getValue()} </Text>
				// }),
				columnHelperset.accessor((row)=>`${row.settingtype} ${row.id}`, {
					id: 'id',
					header: () => <Text> Setting Origin </Text>,
					cell: contents => {const array = contents.getValue().split(' '); var name = ''; if (array[0] ==='Device'){
						name = deviceList[Number(array[1])].name}
						else{
							name = userList[Number(array[1])].name
						}
						return(<Text>{name}</Text>)
					}}
				),
				columnHelperset.accessor('setting', {
					id: 'setting',
					header: () => (<Text > Setting </Text>),
					cell: contents => <Text > {contents.getValue()} </Text>
				}),
				columnHelperset.accessor('message', {
					id: 'message',
					header: () => (<Text > Message </Text>),
					cell: contents => <Text > {contents.getValue()} </Text>
				}),
				columnHelperset.accessor('time', {
					id: 'time',
					header: () => (<Text > Time </Text>),
					cell: contents => <Text > {HoursnMins(contents.getValue())} </Text>
				}),
				columnHelperset.accessor('state',  {
					id: 'state',
					header: () => (<Text > Read</Text>),
					cell: contents => <Checkbox defaultValue={Number(contents.getValue())}> </Checkbox>
				})
			]
			const [data, setData] = React.useState(() => [ ...using ]);
			const table = useReactTable({
				columns,
				data,
				getCoreRowModel: getCoreRowModel(),
			})
			return (
				<Card alignItems='center' flexDirection='column' w='100%' gap='20px'>
				<Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
					Setting Notifications
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
	