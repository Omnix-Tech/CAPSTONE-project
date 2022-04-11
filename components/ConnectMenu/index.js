


import { IconButton, Menu, MenuButton, MenuList, MenuItem, Text } from '@chakra-ui/react';
import FeatherIcon from 'feather-icons-react'

export default function ConnectMenu({ connectsDocs }) {



    return (
        <Menu>
            <MenuButton as={IconButton} size={'xs'} variant={'ghost'} icon={<FeatherIcon icon={'more-horizontal'} />} />

            {connectsDocs ?
                <>
                    <MenuList>
                        {connectsDocs.map(connect => (
                            <MenuItem key={connect.place_id} >
                                <a href={`/?connect=${connect.place_id}`} >
                                    <Text fontSize={'sm'} fontWeight={'medium'} > {connect.area} </Text>
                                </a>
                            </MenuItem>
                        ))}
                    </MenuList>
                </>
                :
                <></>}

        </Menu>
    );
}
