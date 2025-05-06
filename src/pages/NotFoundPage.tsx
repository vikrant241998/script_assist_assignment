import {
  Title,
  Text,
  Button,
  Container,
  Group,
  Center,
  createStyles,
  rem,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(120),
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  inner: {
    position: "relative",
  },

  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
    opacity: 0.75,
    marginBottom: theme.spacing.xl,
  },

  label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: rem(180),
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[2],

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(120),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: rem(38),
    marginBottom: theme.spacing.md,

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(32),
    },
  },

  description: {
    maxWidth: rem(540),
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    textAlign: "center",
  },
}));

export default function NotFoundPage() {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className={classes.root}>
      <Container className={classes.inner}>
        <div className={classes.label}>404</div>
        <Title className={classes.title}>Oops! Page not found.</Title>
        <Text color="dimmed" size="lg" className={classes.description}>
          The page you are trying to access does not exist or has been moved.
          Please check the URL or go back to the homepage.
        </Text>
        <Group position="center">
          <Button variant="subtle" size="md" onClick={goHome}>
            Take me back to home page
          </Button>
        </Group>
      </Container>
    </div>
  );
}
