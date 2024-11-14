// Chakra imports
import { Box, Flex, Text, Icon, useColorModeValue, Checkbox, Table, Thead, Th, Tr, Tbody, Td, Tfoot, Button} from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import IconBox from 'components/icons/IconBox';
import { useState } from 'react';
import * as React from 'react';

import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	Row,
	SortingState,
	useReactTable,
} from '@tanstack/react-table';

import { RowSelectionState } from '@tanstack/react-table';

import { SavePrivateLog } from 'app/fileactions';



// Assets
import { MdCheckBox, MdDragIndicator } from 'react-icons/md';

function HoursnMins(date: Date){
	return(date.getHours() + ':' + date.getMinutes())
};


function hasItSaved(hasit : boolean){
	if (hasit){
	  return(
		<Text> Selected logs saved </Text>
	  )
	}
	else if(hasit === null){
		return(
			<Text> Select logs to securely save them </Text>
		)
	}
	else {
	  return(
		<Text> Logs not saved </Text>
	  )
	}
  }

type RowObj = {
    logId: number;
    time: Date;
    action: string;
    userId: number;
    userName: string;
    deviceId: number;
    deviceName: string;
};

const columnHelper = createColumnHelper<RowObj>();

// function setsaved(bool   : boolean){
// 	return bool;
// }

function isSelected(state:RowSelectionState,id:number){
	return state[id]
}


export default function Conversion(props: { tableData: RowObj[], max: number }) {
	const { tableData, max } = props;
	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const boxBg = useColorModeValue('secondaryGray.300', 'navy.700');
	const brandColor = useColorModeValue('brand.500', 'brand.400');

	//const [saved,setsaved] = React.useState(null)



	
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
	var using : RowObj[];
	if(max == 0){
		using = ([...tableData].sort((a,b)=> b.time.getTime() - a.time.getTime()));
	}
	else{
		using = ([...tableData].sort((a,b)=> b.time.getTime() - a.time.getTime())).slice(0,max);
	}

	
	const columns = [
		columnHelper.accessor('deviceName', {
			id: 'device',
			header: () => (<Text > Device </Text>),
			cell: contents => <Text > {contents.getValue()} </Text>
		}),
		columnHelper.accessor('userName', {
			id: 'user',
			header: () => (<Text > User </Text>),
			cell: contents => <Text > {contents.getValue()} </Text>
		}),
		columnHelper.accessor('action', {
			id: 'action',
			header: () => (<Text > Action </Text>),
			cell: contents => <Text > {contents.getValue()} </Text>
		}),
		columnHelper.accessor('time', {
			id: 'time',
			header: () => (<Text > Time </Text>),
			cell: contents => <Text > {HoursnMins(contents.getValue())} {/*JSON.stringify(isSelected(rowSelection,contents.row.original.logId))*/} </Text>
		}),
		columnHelper.display( {
			id:'state',
			header: () => (<Text> Select </Text>),
			cell: (cell)=> {var check = cell.row.getIsSelected();
				const id = cell.row.original.logId; 
				return(
			<Checkbox 
			//checked={isSelected(rowSelection,id)} 
			// disabled={!row.getCanSelect()} 
			onChange={cell.row.getToggleSelectedHandler()}></Checkbox>
		)}})
		
	]
	const [data, setData] = React.useState(() => [ ...using ]);
	const [saved, setsaved] = React.useState(null)
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({}) //manage your own row selection state
	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
		enableRowSelection: true,
		onRowSelectionChange: setRowSelection,
		state: {rowSelection},
		getRowId: (originalRow) => String(originalRow.logId),
		
	})
	return (
		<Card p='100px' alignItems='center' flexDirection='column' w='100%' gap='20px'>
			{/*JSON.stringify(rowSelection)*/}

		<Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
			Device Logs
		</Text>
		{table.getSelectedRowModel().rows.length > 0 ? (
					<Button onClick={async()=> {setsaved(await SavePrivateLog(rowSelection)); table.resetRowSelection()}}>
						Save Selected Rows to Private Log File
					</Button>
				) : null }
		<Table variant='striped' size="sm">
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
		
		<Text>{hasItSaved(saved)}</Text>
		</Card>
	)
	}



