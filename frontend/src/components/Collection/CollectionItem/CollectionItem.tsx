import { ActionIcon, createStyles, Flex, Text } from '@mantine/core';
import React, { useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';

interface Prop {
  name: string;
  id: number;
}
const CollectionItem = (prop: Prop) => {
  const [opened, setOpened] = useState(false);
  const { classes, theme } = useStyles();
  return (
    <>
      <Flex align={'center'} key={prop.id} className={classes.collectionLink}>
        <ActionIcon variant="transparent" onClick={() => setOpened((o) => !o)}>
          <IoIosArrowForward
            size={16}
            className={classes.collectionArrow}
            style={{
              transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
            }}
          />
        </ActionIcon>
        <Text display={'inline'} size={'xs'}>
          {prop.name}
        </Text>
      </Flex>
    </>
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

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },
}));
