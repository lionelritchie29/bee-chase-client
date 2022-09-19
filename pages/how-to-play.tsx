import { NextPage } from 'next';
import Layout from '../widgets/Layout';
import firstStepImg from '../public/assets/how-to-play/1.jpg';
import secondStepImg from '../public/assets/how-to-play/2.jpg';
import thirdStepImg from '../public/assets/how-to-play/3.jpg';
import fourthStepImg from '../public/assets/how-to-play/4.jpg';
import fifthStepImg from '../public/assets/how-to-play/5.jpg';
import sixthStepImg from '../public/assets/how-to-play/6.jpg';
import Image from 'next/image';

const HowToPlayPage: NextPage = () => {
  const data = [
    {
      step: 1,
      image: firstStepImg,
      title: 'Visit & Login',
      desc: `Visit <a class='underline text-blue-600' href="https://beechase.apps.binus.ac.id">BeeChase</a> in your browser and log in using your <strong>NIM</strong> and <strong>Binusmaya password</strong>.`,
    },
    {
      step: 2,
      image: secondStepImg,
      title: 'Join Game',
      desc: 'Join a game by visiting the Join page and <strong>input the game code</strong>.',
    },
    {
      step: 3,
      image: thirdStepImg,
      title: 'Join or Create Team',
      desc: 'Join existing team or create a new team to play. There are two types of game: <strong>individual</strong> and <strong>team</strong>. Individual game will have teams that each consist of one member only (yourself). Meanwhile for team game, each team must have minimum of 2 members and maximum of 10.',
    },
    {
      step: 4,
      image: fourthStepImg,
      title: 'Play',
      desc: 'After you have a team, you can play! There are five types of mission: <strong>multiple choice, short text, photo/video, location, and verification</strong>. Each mission will have its own point that will be accumulated for each team.',
    },
    {
      step: 5,
      image: fifthStepImg,
      title: 'Join the Vibes',
      desc: `View <strong>leaderboard, other team's submissions, and your team submissions</strong> which could be accessed from bottom navigation menu.`,
    },
    {
      step: 6,
      image: sixthStepImg,
      title: 'Global Leaderboard',
      desc: 'View <strong>current global leaderboard</strong>, <strong>your total score</strong> and <strong>rank</strong> throughout every game you have participated.',
    },
  ];

  return (
    <Layout title='How to Play'>
      <section>
        <h1 className='text-secondary font-bold text-2xl text-center mt-4'>How to Play</h1>
      </section>

      <div className='divider'></div>

      <section>
        <ul className='grid grid-cols-1 gap-3'>
          {data.map((item) => (
            <li className='flex' key={item.step}>
              <div>
                <h2 className='font-bold text-xl'>{item.title}</h2>
                <p className='mb-3' dangerouslySetInnerHTML={{ __html: item.desc }}></p>
                {item.image && (
                  <div>
                    <Image
                      src={item.image}
                      className='object-fit rounded'
                      width={1000}
                      height={800}
                      alt=''
                    />
                  </div>
                )}
                <div className='divider'></div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default HowToPlayPage;
