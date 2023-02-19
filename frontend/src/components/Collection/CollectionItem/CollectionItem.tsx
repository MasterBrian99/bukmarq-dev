import { ActionIcon, Box, createStyles, Flex, Loader, Menu, Text } from '@mantine/core';
import React, { useState } from 'react';
import { BiDotsHorizontalRounded, BiMove, BiPaste } from 'react-icons/bi';
import { GrCut } from 'react-icons/gr';
import { IoIosArrowForward } from 'react-icons/io';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';

import { getCollectionByParentID } from '../../../api/collection';
import {
  CollectionResponseDataI,
  CollectionResponseI,
} from '../../../dto/collection.dto';
import { moveStateAtom } from '../../../store/atom/atom';
import CollectionRename from './CollectionRename/CollectionRename';
interface Prop {
  name: string;
  id: number;
  parentID: number;
  marginLeft: number;
}

const CollectionItem = (prop: Prop) => {
  const [opened, setOpened] = useState(false);
  const [moveState, setMoveState] = useRecoilState(moveStateAtom);
  const { classes, theme } = useStyles();
  const [collectionList, setCollectionList] = useState<CollectionResponseDataI[]>([]);
  const collectionQuery = useQuery<CollectionResponseI>({
    queryKey: [`collection`, prop.id],
    queryFn: () => getCollectionByParentID(prop.id),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    enabled: opened,
    onSuccess: (data) => {
      console.log(data);
      setCollectionList(data.data);
    },
  });
  // const loginMutation = useMutation(loginUser, {
  //   onSuccess: (res) => {
  //     console.log(res);
  //     if (
  //       signIn({
  //         token: res.jwt,
  //         expiresIn: 600,
  //         tokenType: 'Bearer',
  //         authState: res,
  //       })
  //     ) {
  //       // Redirect or do-something
  //       navigate('/', { replace: true });
  //       location.reload();
  //     }
  //   },
  //   onError: (err: CustomErrorResponse) => {
  //     console.log(err.message);
  //     form.setFieldError('username', err.message);
  //   },
  // });
  return (
    <Box
      style={{
        marginLeft: `${prop.marginLeft}px`,
      }}
    >
      <Flex
        align={'center'}
        key={prop.id}
        className={classes.collectionLink}
        justify={'space-between'}
      >
        <Flex justify={'center'} align={'center'}>
          <ActionIcon variant="transparent" onClick={() => setOpened((o) => !o)}>
            {collectionQuery.isLoading ? (
              <Loader size="xs" mr={'sm'} />
            ) : (
              <IoIosArrowForward
                size={16}
                className={classes.collectionArrow}
                style={{
                  transform: opened
                    ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)`
                    : 'none',
                }}
              />
            )}
          </ActionIcon>
          <Text display={'inline'} size={'xs'}>
            {prop.name}
          </Text>
        </Flex>
        <Box>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <ActionIcon variant="transparent">
                <BiDotsHorizontalRounded size={16} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Collection</Menu.Label>
              <Menu.Item
                icon={<GrCut size={14} />}
                onClick={() =>
                  setMoveState((prevState) => ({
                    ...prevState,
                    child: prop.id,
                  }))
                }
              >
                Cut
              </Menu.Item>
              <Menu.Item
                icon={<BiPaste size={14} />}
                disabled={moveState.child == null}
                onClick={() => {
                  setMoveState((prevState) => ({
                    ...prevState,
                    parent: prop.id,
                  }));
                }}
              >
                Paste
              </Menu.Item>
              <Menu.Item icon={<BiMove size={14} />}>Move to root</Menu.Item>

              <CollectionRename />
            </Menu.Dropdown>
          </Menu>
        </Box>
      </Flex>
      <Box>
        {opened && collectionQuery.data ? (
          collectionList.map((el) => (
            <CollectionItem
              marginLeft={7}
              id={el.ID}
              name={el.Name}
              parentID={el.ParentId}
              key={el.ID}
            />
          ))
        ) : collectionQuery.isLoading ? (
          <></>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default CollectionItem;

const useStyles = createStyles((theme) => ({
  collectionArrow: {
    marginRight: theme.spacing.xs,
    transition: 'transform 200ms ease',
  },
  collectionLink: {
    display: 'block',
    padding: `3px ${theme.spacing.xs}px`,
    textDecoration: 'none',
    borderRadius: theme.radius.sm,
    fontSize: theme.fontSizes.xs,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    lineHeight: 1,
    fontWeight: 500,
    cursor: 'pointer',
    userSelect: 'none',

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },
}));
