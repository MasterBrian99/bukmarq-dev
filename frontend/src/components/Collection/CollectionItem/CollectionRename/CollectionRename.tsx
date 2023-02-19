import { Box, Button, Group, Menu, Popover, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import { BsPencil } from 'react-icons/bs';

const CollectionRename = () => {
  const [opened, setOpened] = useState(false);
  return (
    <Popover opened={opened} onChange={setOpened}>
      <Popover.Target>
        <Menu.Item
          closeMenuOnClick={false}
          icon={<BsPencil size={14} />}
          onClick={() => setOpened((o) => !o)}
        >
          Rename
        </Menu.Item>
      </Popover.Target>

      <Popover.Dropdown>
        <Box>
          <TextInput placeholder="name" label="name" withAsterisk />
          <Group position={'right'} mt={'xs'}>
            <Button size={'xs'}>Update</Button>
          </Group>
        </Box>
      </Popover.Dropdown>
    </Popover>
  );
};

export default CollectionRename;
