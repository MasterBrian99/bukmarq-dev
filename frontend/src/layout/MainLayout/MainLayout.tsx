import {
  ActionIcon,
  AppShell,
  Badge,
  Code,
  createStyles,
  Group,
  Navbar,
  ScrollArea,
  Text,
  TextInput,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import { IoIosAdd, IoIosArrowForward } from 'react-icons/io';
import { Outlet } from 'react-router-dom';

import CollectionItem from '../../components/Collection/CollectionItem/CollectionItem';

const links = [
  { icon: IoIosArrowForward, label: 'Activity', notifications: 3 },
  { icon: IoIosArrowForward, label: 'Tasks', notifications: 4 },
  { icon: IoIosArrowForward, label: 'Contacts' },
];

const collections = [
  { emoji: '👍', label: 'Sales' },
  { emoji: '🚚', label: 'Deliveries' },
  { emoji: '💸', label: 'Discounts' },
  { emoji: '💰', label: 'Profits' },
  { emoji: '✨', label: 'Reports' },
  { emoji: '🛒', label: 'Orders' },
  { emoji: '📅', label: 'Events' },
  { emoji: '🙈', label: 'Debts' },
  { emoji: '💁‍♀️', label: 'Customers' },
  { emoji: '💁‍♀️', label: 'Customers' },
  { emoji: '💁‍♀️', label: 'Customers' },
  { emoji: '💁‍♀️', label: 'Customers' },
  { emoji: '💁‍♀️', label: 'Customers' },
  { emoji: '💁‍♀️', label: 'Customers' },
  { emoji: '💁‍♀️', label: 'Customers' },
  { emoji: '💁‍♀️', label: 'Customers' },
  { emoji: '💁‍♀️', label: 'Customers' },
  { emoji: '💁‍♀️', label: 'Customers' },
  { emoji: '💁‍♀️', label: 'Customers' },
  { emoji: '💁‍♀️', label: 'Customers' },
  { emoji: '💁‍♀️', label: 'Customers' },
  { emoji: '💁‍♀️', label: 'Customers' },
  { emoji: '💁‍♀️', label: 'Customers' },
  { emoji: '💁‍♀️', label: 'Customers' },
  { emoji: '💁‍♀️', label: 'Customers' },
  { emoji: '💁‍♀️', label: 'Customers' },
  { emoji: '💁‍♀️', label: 'Customers' },
  { emoji: '💁‍♀️', label: 'Customers' },
  { emoji: '💁‍♀️', label: 'Customers' },
  { emoji: '💁‍♀️', label: 'Customers' },
  { emoji: '💁‍♀️', label: 'Customers' },
  { emoji: '💁‍♀️', label: 'Customers' },
  { emoji: '💁‍♀️', label: 'Customers' },
  { emoji: '💁‍♀️', label: 'Customers' },
  { emoji: '💁‍♀️', label: 'Customers' },
];
export default function MainLayout() {
  const { classes } = useStyles();
  const mainLinks = links.map((link) => (
    <UnstyledButton key={link.label} className={classes.mainLink}>
      <div className={classes.mainLinkInner}>
        <link.icon size={20} className={classes.mainLinkIcon} stroke={'1.5'} />
        <span>{link.label}</span>
      </div>
      {link.notifications && (
        <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
          {link.notifications}
        </Badge>
      )}
    </UnstyledButton>
  ));

  const collectionLinks = collections.map((collection, id) => (
    <CollectionItem key={id} id={id} name={collection.label} />
  ));
  return (
    <AppShell
      className={classes.shell}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar width={{ sm: 300 }} p="md" className={classes.navbar}>
          <Navbar.Section className={classes.section}>
            <Text>asd</Text>
          </Navbar.Section>

          <TextInput
            placeholder="Search"
            size="xs"
            icon={<IoIosArrowForward size={12} stroke={'1.5'} />}
            rightSectionWidth={70}
            rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
            styles={{ rightSection: { pointerEvents: 'none' } }}
            mb="sm"
          />

          <Navbar.Section className={classes.section}>
            <div className={classes.mainLinks}>{mainLinks}</div>
          </Navbar.Section>

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
            <div className={classes.collections}>{collectionLinks}</div>
          </Navbar.Section>
        </Navbar>
      }
    >
      <Outlet />
    </AppShell>
  );
}

const useStyles = createStyles((theme) => ({
  shell: {
    background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },
  navbar: {
    paddingTop: 0,
    background:
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
  },

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
  collectionSection: {
    height: 200,
  },

  searchCode: {
    fontWeight: 700,
    fontSize: 10,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2]
    }`,
  },

  mainLinks: {
    paddingLeft: theme.spacing.md - theme.spacing.xs,
    paddingRight: theme.spacing.md - theme.spacing.xs,
    paddingBottom: theme.spacing.md,
  },

  mainLink: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    fontSize: theme.fontSizes.xs,
    padding: `8px ${theme.spacing.xs}px`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  mainLinkInner: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },

  mainLinkIcon: {
    marginRight: theme.spacing.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
  },

  mainLinkBadge: {
    padding: 0,
    width: 20,
    height: 20,
    pointerEvents: 'none',
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

  collectionLink: {
    display: 'block',
    padding: `8px ${theme.spacing.xs}px`,
    textDecoration: 'none',
    borderRadius: theme.radius.sm,
    fontSize: theme.fontSizes.xs,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    lineHeight: 1,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },
}));
