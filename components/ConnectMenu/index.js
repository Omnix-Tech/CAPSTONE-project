


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
                            <MenuItem as={'a'} href={`${window.location.pathname}?connect=${connect.place_id}`}  key={connect.place_id} >
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
