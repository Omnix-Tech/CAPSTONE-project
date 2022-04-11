


import { Tooltip, IconButton, Menu, MenuButton, MenuList, MenuItem, Text } from '@chakra-ui/react';
import FeatherIcon from 'feather-icons-react'
import useConnect from '../../controller/hooks/useConnect';

export default function ConnectMenu({ connectsDocs, handleSetConnect  }) {


    return (
        <Menu>
            <Tooltip label={'More Connects'} >
                <MenuButton>

                    <IconButton variant={'ghost'} size={'xs'} icon={<FeatherIcon icon={'more-horizontal'} />} />

                </MenuButton>
            </Tooltip>

            {connectsDocs ?
                <>
                    <MenuList>
                        {connectsDocs.map(connect => (
                            <MenuItem key={connect.place_id} onClick={() => handleSetConnect(connect.place_id)}>
                                <Text fontSize={'sm'} fontWeight={'medium'} > {connect.area} </Text>
                            </MenuItem>
                        ))}
                    </MenuList>
                </>
                :
                <></>}

        </Menu>
    );
}
