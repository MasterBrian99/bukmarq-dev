import { ActionIcon, Box, Button, Group, Popover, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useState } from 'react';
import { IoIosAdd } from 'react-icons/io';
import { useMutation, useQueryClient } from 'react-query';

import { createCollection } from '../../../../api/collection';
import { CustomErrorResponse } from '../../../../http/httpClient';

const CollectionCreate = () => {
  const [opened, setOpened] = useState(false);
  const queryClient = useQueryClient();
  const form = useForm({
    initialValues: {
      name: '',
      parent: 0,
    },
  });
  const createCollectionMutation = useMutation(createCollection, {
    onSuccess: () => {
      // console.log(res);
      setOpened(false);
      queryClient.refetchQueries(['collection', 0]);
      form.reset();
    },
    onError: (err: CustomErrorResponse) => {
      console.log(err);
    },
  });

  function submitCreateCollection() {
    createCollectionMutation.mutate({
      ...form.values,
    });
  }

  return (
    <Popover opened={opened} onChange={setOpened}>
      <Popover.Target>
        <ActionIcon variant="default" size={18} onClick={() => setOpened((o) => !o)}>
          <IoIosAdd size={12} stroke={'1.5'} />
        </ActionIcon>
      </Popover.Target>

      <Popover.Dropdown>
        <form onSubmit={form.onSubmit(() => submitCreateCollection())}>
          <Box>
            <TextInput
              placeholder="name"
              label="name"
              withAsterisk
              {...form.getInputProps('name')}
              required
            />
            <Group position={'right'} mt={'xs'}>
              <Button size={'xs'} type={'submit'}>
                Create
              </Button>
            </Group>
          </Box>
        </form>
      </Popover.Dropdown>
    </Popover>
  );
};

export default CollectionCreate;
