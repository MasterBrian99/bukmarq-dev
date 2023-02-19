import { ActionIcon, Box, Button, Group, Popover, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import { IoIosAdd } from 'react-icons/io';

const CollectionCreate = () => {
  const [opened, setOpened] = useState(false);

  return (
    <Popover opened={opened} onChange={setOpened}>
      <Popover.Target>
        <ActionIcon variant="default" size={18} onClick={() => setOpened((o) => !o)}>
          <IoIosAdd size={12} stroke={'1.5'} />
        </ActionIcon>
      </Popover.Target>

      <Popover.Dropdown>
        <Box>
          <TextInput placeholder="name" label="name" withAsterisk />
          <Group position={'right'} mt={'xs'}>
            <Button size={'xs'}>Create</Button>
          </Group>
        </Box>
      </Popover.Dropdown>
    </Popover>
  );
};

export default CollectionCreate;
