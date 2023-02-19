import { Box, Button, Group, Menu, Popover, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useState } from 'react';
import { BsPencil } from 'react-icons/bs';
import { useMutation, useQueryClient } from 'react-query';

import { updateCollection } from '../../../../api/collection';
import { CustomErrorResponse } from '../../../../http/httpClient';
import { UPDATE_TYPE } from '../../../../util/constant';

interface Prop {
  id: number;
  name: string;
  parent: number;
}
const CollectionRename = (prop: Prop) => {
  const [opened, setOpened] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm({
    initialValues: {
      name: prop.name,
      parent: 0,
      id: prop.id,
      type: UPDATE_TYPE.RENAME,
    },
  });
  const updateCollectionMutation = useMutation(updateCollection, {
    onSuccess: () => {
      // console.log(res);
      setOpened(false);
      queryClient.refetchQueries(['collection', prop.parent]);
      form.reset();
    },
    onError: (err: CustomErrorResponse) => {
      console.log(err);
    },
  });

  function submitUpdateCollection() {
    updateCollectionMutation.mutate({
      ...form.values,
    });
  }

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
        <form onSubmit={form.onSubmit(() => submitUpdateCollection())}>
          <Box>
            <TextInput
              placeholder="name"
              label="name"
              withAsterisk
              {...form.getInputProps('name')}
              required
            />
            <Group position={'right'} mt={'xs'}>
              <Button type={'submit'} size={'xs'}>
                Update
              </Button>
            </Group>
          </Box>
        </form>
      </Popover.Dropdown>
    </Popover>
  );
};

export default CollectionRename;
