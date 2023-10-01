import Link from 'next/link'
import Image from 'next/image'
import Layout from '../components/Layouts/Default'
import AnimateIn from '../components/AnimateIn'
import { BsFacebook, BsInstagram, BsYoutube, BsSpotify } from 'react-icons/bs'
import { AiOutlineMail } from 'react-icons/ai'

export default function Home() {
  const text =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non erat turpis. Vestibulum tincidunt tortor vitae dictum semper. Donec ut nulla lorem. Nam sem ipsum, condimentum varius tempor nec, pharetra sit amet leo. Mauris non vehicula tortor, nec venenatis ipsum. Fusce feugiat massa sed justo laoreet lacinia. Nulla tempus dignissim mi, a feugiat urna pretium vestibulum. Duis pellentesque risus a purus faucibus luctus. Maecenas laoreet, magna sit amet lobortis congue, tortor orci mattis purus, et consectetur dolor felis a mauris. Aliquam consectetur, nibh non molestie porta, turpis erat sodales risus, tincidunt sodales diam turpis ultricies elit. Donec dignissim malesuada finibus. Mauris iaculis ultrices eros, vitae laoreet nisi venenatis sed. Etiam et pellentesque enim. Ut mollis, turpis ac pellentesque condimentum, purus odio porta tellus, a tincidunt erat nisl eu sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non erat turpis. Vestibulum tincidunt tortor vitae dictum semper. Donec ut nulla lorem. Nam sem ipsum, condimentum varius tempor nec, pharetra sit amet leo. Mauris non vehicula tortor, nec venenatis ipsum. Fusce feugiat massa sed justo laoreet lacinia. Nulla tempus dignissim mi, a feugiat urna pretium vestibulum. Duis pellentesque risus a purus faucibus luctus. Maecenas laoreet, magna sit amet lobortis congue, tortor orci mattis purus, et consectetur dolor felis a mauris. Aliquam consectetur, nibh non molestie porta, turpis erat sodales risus, tincidunt sodales diam turpis ultricies elit. Donec dignissim malesuada finibus. Mauris iaculis ultrices eros, vitae laoreet nisi venenatis sed. Etiam et pellentesque enim. Ut mollis, turpis ac pellentesque condimentum, purus odio porta tellus, a tincidunt erat nisl eu sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non erat turpis. Vestibulum tincidunt tortor vitae dictum semper. Donec ut nulla lorem. Nam sem ipsum, condimentum varius tempor nec, pharetra sit amet leo. Mauris non vehicula tortor, nec venenatis ipsum. Fusce feugiat massa sed justo laoreet lacinia. Nulla tempus dignissim mi, a feugiat urna pretium vestibulum. Duis pellentesque risus a purus faucibus luctus. Maecenas laoreet, magna sit amet lobortis congue, tortor orci mattis purus, et consectetur dolor felis a mauris. Aliquam consectetur, nibh non molestie porta, turpis erat sodales risus, tincidunt sodales diam turpis ultricies elit. Donec dignissim malesuada finibus. Mauris iaculis ultrices eros, vitae laoreet nisi venenatis sed. Etiam et pellentesque enim. Ut mollis, turpis ac pellentesque condimentum, purus odio porta tellus, a tincidunt erat nisl eu sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non erat turpis. Vestibulum tincidunt tortor vitae dictum semper. Donec ut nulla lorem. Nam sem ipsum, condimentum varius tempor nec, pharetra sit amet leo. Mauris non vehicula tortor, nec venenatis ipsum. Fusce feugiat massa sed justo laoreet lacinia. Nulla tempus dignissim mi, a feugiat urna pretium vestibulum. Duis pellentesque risus a purus faucibus luctus. Maecenas laoreet, magna sit amet lobortis congue, tortor orci mattis purus, et consectetur dolor felis a mauris. Aliquam consectetur, nibh non molestie porta, turpis erat sodales risus, tincidunt sodales diam turpis ultricies elit. Donec dignissim malesuada finibus. Mauris iaculis ultrices eros, vitae laoreet nisi venenatis sed. Etiam et pellentesque enim. Ut mollis, turpis ac pellentesque condimentum, purus odio porta tellus, a tincidunt erat nisl eu sapien.'

  const TwoColumnLayout = ({ text }) => {
    const maxLengthForTwoColumns = 1000

    if (text?.length < maxLengthForTwoColumns) {
      return <div className='prose prose-2xl max-w-3xl '>{text}</div>
    }

    return <div className='prose prose-2xl max-w-7xl lg:columns-2 gap-10'>{text}</div>
  }

  return (
    <Layout pageTitle='About'>
      <div className='-mt-[85px] pt-[85px] min-h-screen'>
        <div className='container centerContent flex-col gap-6 md:gap-16 p-6 md:py-16'>
          <AnimateIn className='relative w-full aspect-[9/16] md:aspect-video'>
            <Image
              alt='/veera-3367.jpg'
              src='/veera-3367.jpg'
              fill
              className={`object-cover object-center rounded shadow`}
            />
          </AnimateIn>

          <AnimateIn className='text-center md:text-justify leading-[2rem] tracking-wide font-sans font-medium z-10 md:px-10'>
            <TwoColumnLayout text={text} />
          </AnimateIn>
        </div>
      </div>
    </Layout>
  )
}
