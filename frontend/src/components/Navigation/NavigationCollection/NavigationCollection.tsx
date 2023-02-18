import {
  ActionIcon,
  Box,
  createStyles,
  Group,
  Navbar,
  ScrollArea,
  Skeleton,
  Text,
  Tooltip,
} from '@mantine/core';
import React, { useState } from 'react';
import { IoIosAdd } from 'react-icons/io';
import { useQuery } from 'react-query';

import { getCollectionByParentID } from '../../../api/collection';
import {
  CollectionResponseDataI,
  CollectionResponseI,
} from '../../../dto/collection.dto';
import CollectionItem from '../../Collection/CollectionItem/CollectionItem';

const useStyles = createStyles((theme) => ({
  section: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    marginBottom: theme.spacing.md,
    '&:not(:last-of-type)': {
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
    },
  },

  collections: {
    paddingLeft: theme.spacing.md - 6,
    paddingRight: theme.spacing.md - 6,
    paddingBottom: theme.spacing.md,
  },

  collectionsHeader: {
    paddingLeft: theme.spacing.md + 2,
    paddingRight: theme.spacing.md,
    marginBottom: 5,
  },
}));

const NavigationCollection = () => {
  const [collectionList, setCollectionList] = useState<CollectionResponseDataI[]>([]);
  const collectionQuery = useQuery<CollectionResponseI>({
    queryKey: [`collection`, 0],
    queryFn: () => getCollectionByParentID(0),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setCollectionList(data.data);
    },
  });

  const { classes } = useStyles();
  return (
    <Navbar.Section className={`${classes.section}`} grow component={ScrollArea}>
      <Group className={classes.collectionsHeader} position="apart">
        <Text size="xs" weight={500} color="dimmed">
          Collections
        </Text>
        <Tooltip label="Create collection" withArrow position="right">
          <ActionIcon variant="default" size={18}>
            <IoIosAdd size={12} stroke={'1.5'} />
          </ActionIcon>
        </Tooltip>
      </Group>
      <div className={classes.collections}>
        {collectionQuery.isLoading ? (
          <Box mx={'xs'} mt={'sm'}>
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i}>
                <Skeleton height={25} radius="sm" mb={'xs'} />
                <Skeleton height={25} radius="sm" mb={'xs'} />
              </span>
            ))}
          </Box>
        ) : collectionQuery.data ? (
          collectionList.map((ele) => (
            <CollectionItem
              marginLeft={0}
              key={ele.ID}
              id={ele.ID}
              name={ele.Name}
              parentID={ele.ParentId}
            />
          ))
        ) : collectionQuery.isError ? (
          <></>
        ) : (
          <></>
        )}
      </div>
    </Navbar.Section>
  );
};

export default NavigationCollection;
