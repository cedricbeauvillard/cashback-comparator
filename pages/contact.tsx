import {Button, Card, createStyles, Group, Textarea, TextInput} from '@mantine/core';
import Head from 'next/head';
import {useState, VFC} from 'react';
import {useGoogleReCaptcha} from 'react-google-recaptcha-v3';
import {FooterLinks} from '../components/generic/FooterLinks';
import {SearchHeader} from '../components/generic/SearchHeader';
import {footerData} from '../components/_static';
import {submitEmail} from '../lib/api/consumers/user';

export interface ContactPageProps {}

const useStyles = createStyles((theme) => ({
  cardBody: {
    marginLeft: '1rem',
    marginRight: '1rem',
    marginTop: '1rem',
    marginBottom: '0.5rem',

    [theme.fn.largerThan('xs')]: {
      maxWidth: 1210,
      borderRadius: '0.6rem',
      padding: '1.5rem',
      backgroundColor: 'white',
      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    },
  },

  form: {
    width: '100%',
    backgroundColor: theme.white,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    borderRadius: theme.radius.md,
  },

  input: {
    backgroundColor: theme.white,
    borderColor: theme.colors.gray[4],
    color: theme.black,

    '&::placeholder': {
      color: theme.colors.gray[5],
    },
  },

  inputLabel: {
    color: theme.black,
  },

  control: {
    backgroundColor: theme.colors[theme.primaryColor][6],
  },
}));

const ContactPage: VFC<ContactPageProps> = () => {
  const {executeRecaptcha} = useGoogleReCaptcha();
  const [response, setResponse] = useState<any | null>(null);
  const [isBtnDisabled, setBtnDisabled] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userMesssage, setUserMessage] = useState('');
  const {classes} = useStyles();

  const handleSubmit = async (userEmail: string, userName: string, userMesssage: string) => {
    if (!executeRecaptcha) {
      console.log('Failed to send');
      return;
    }

    try {
      const token = await executeRecaptcha();
      if (!token) {
        setResponse({message: 'Failed to Send!!!', status: 'Invalid captcha token'});
        return;
      }

      await submitEmail(token, userEmail, userName, userMesssage);

      /*         setResponse({
          message: 'userMessage.emailSent,
          status: 200,
        }); */
      setBtnDisabled(false);
    } catch (error) {
      setResponse({message: 'Failed to Send!!!', status: 'Failed'});
      setBtnDisabled(false);
    }
  };

  return (
    <div>
      <Head>
        <title>
          Contact - MeilleursCashback - Comparez les taux de casback de plus de 8000 marchands.
        </title>
        <link rel="icon" href="/logo.webp" />
        <link rel="canonical" href="https://meilleurscashback.com/contact" />
        <meta
          name="description"
          content={
            'Découvrez la section d\'aide MeilleursCashback sur le sujet "Nous contacter" ou contactez-nous au sur "meilleurscashback@gmail.com.'
          }
        />
        <meta
          property="og:title"
          content={
            'Contact - MeilleursCashback - Comparez les taux de casback de plus de 8000 marchands.'
          }
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content={
            'Découvrez la section d\'aide MeilleursCashback sur le sujet "Nous contacter" ou contactez-nous au sur "meilleurscashback@gmail.com.'
          }
        />
        <meta property="og:site_name" content="MeilleursCashback" />
        <meta property="og:url" content="https://meilleurscashback.com/contact"></meta>
        <meta property="og:image" content="/logo.webp"></meta>
      </Head>
      <main>
        <SearchHeader></SearchHeader>
        <div className="flex flex-col items-center justify-center">
          <Card className={classes.cardBody} withBorder>
            <h1 className="m-0 mb-8">Nous contacter</h1>
            <p>
              Utilisez ce formulaire pour signaler une erreur sur le site ou pour proposer un
              nouveau site de cashback qui n'est pas encore référencé sur meilleurscashback.com.
            </p>
            <div className={classes.form}>
              <TextInput
                label="Email"
                placeholder="Votre email"
                required
                maxLength={255}
                classNames={{input: classes.input, label: classes.inputLabel}}
                onChange={(event) => setUserEmail(event.currentTarget.value)}
              />
              <TextInput
                label="Nom"
                placeholder="Votre nom"
                mt="md"
                maxLength={255}
                classNames={{input: classes.input, label: classes.inputLabel}}
                onChange={(event) => setUserName(event.currentTarget.value)}
              />
              <Textarea
                required
                label="Message"
                placeholder="Votre message"
                minRows={4}
                mt="md"
                maxLength={255}
                classNames={{input: classes.input, label: classes.inputLabel}}
                onChange={(event) => setUserMessage(event.currentTarget.value)}
              />

              <Group position="right" mt="md">
                {/* TODO: confirmation message */}
                <Button
                  disabled={isBtnDisabled}
                  className={classes.control}
                  onClick={async () => handleSubmit(userEmail, userName, userMesssage)}
                >
                  Envoyer
                </Button>
              </Group>
            </div>
          </Card>
        </div>
      </main>
      <footer>
        <footer>
          <FooterLinks data={footerData}></FooterLinks>
        </footer>
      </footer>
    </div>
  );
};

export default ContactPage;
