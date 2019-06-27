import acehotel from '../assets/Ace-Hotel.jpg';
import bklynclay from '../assets/BKLYN-Clay-.jpg';
import barrowGroup from '../assets/The-Barrow-Group.jpg';
import primeSteakhouse from '../assets/carnem-prime.jpg';
import loloseafood from '../assets/loLo-seafood.jpeg';
import leagueOfKitchens from '../assets/League-of-Kitchens.jpg';
import { faHotel } from '@fortawesome/free-solid-svg-icons';

export const navHeaders = [
  { name: 'our story' },
  // { name: 'benefits' },
  { name: 'members' },
  { name: 'partners' },
  { name: 'experiences' },
  { name: 'learn more' }
];

export const AnokohouseText = {
  aboutTitle: 'ANOKO HOUSE',
  aboutText: [
    {
      aboutText: `The Anoko House launches in 2020 in New York City, as a luxury co-working space and members club designed to nurture, promote and celebrate people of the global African diaspora, and ultimately leverage the power of the collective to build wealth for people of color around the world.`
    },
    {
      aboutText: `The Anoko House will offer amenities such as a workspace and library, cafe, lounge / bar, screening room and meditation room as well as creative programming, intimate conversations, dinners, performances and workshops. Anoko House members will also receive unique perks with our partners, such as VIP access to art fairs and festivals, invitations to private receptions and discounts to concerts, performances, tastings, dinners and travel experiences.`
    },
    {
      aboutText: `We are here to shift the paradigm and change the game by harnessing the power of art and culture in bringing diverse people together and fostering intimate connections and relationships.`
    },
    {
      aboutText: `Anoko, which means "wealth" in the Nigerian language of Igala was founded in November of 2016 by attorney and singer Shimite Obialo, as a community for art lovers. Since 2016, the Anoko community has grown to over 600 creatives, entrepreneurs and professionals craving friendship, networking, mentorship, knowledge, insider access and cultural experiences. To see our journey, follow us on Instagram @anokohouse.`
    }
  ],
  picassoText: `"Every child is an artist.The problem is how to remain an artist once we grow up."`,
  picassoName: 'Pablo Picasso',
  coreValuesTitle: 'our core values',
  coreValuesLoveTitle: 'We Love',
  corValuesLove: [
    'Diversity',
    'Meeting New People',
    'Challenging the Status Quo',
    'Exploring Art & Culture',
    'Relaxing',
    'Sharing Resources',
    'Artistic Expression'
  ],
  coreValuesHateTitle: 'We Hate',
  coreValuesHate: [
    'Conformity',
    'Intolerance',
    'Compacency',
    'Pussy Grabbing',
    'Stuffiness',
    'Selfishness',
    'Ignorance'
  ],
  benefitsTitle: 'The Benefits',
  benefitsTitleText:
    'Your membership with ANOKO gets you access to a thoughtfully curated art ecosystem and a community of like-minded spirits. Membership is currently only available in New York City.',
  benefitsText: [
    {
      Title: 'Exclusive',
      Text: `Enjoy exclusive membership discounts and/or VIP access to art events, classes, performances, festivals, restaurants, hotels, etc.`
    },
    {
      Title: 'Community',
      Text: `Meet diverse professionals who share common passions and interests`
    },
    {
      Title: 'Events',
      Text: `Attend curated events specially tailored to your interests.`
    },
    {
      Title: 'Art Advisory',
      Text: `Start building or grow your fine art collection with tips from our expert advisors.`
    }
  ]
};

export const partnersTitle = `Art Classes | 
                            Arts & Culture | 
                            Restaurants | 
                            Performances | 
                            Hotels | 
                            Nightlife`;

export const partnersData = [
  {
    image: acehotel,
    title: 'ace hotel',
    about: `Members receive a 10% discount off 
    accommodations at Ace Hotel, a hip youthful 
    hotel in midtown with a retro, artistic decor.
    The Lobby Bar features a rotating cast of craft 
    beers & spirits, and a selections of snacks from 
    the Breslin kitchen. Â During the day, the lobby 
    takes on a co-working space vibe, and in the 
    evening there is a lively bar where DJs spin vinyl 
    or live bands play on select evenings`,
    tags: ['#nightlife', '#hotel']
  },
  {
    image: bklynclay,
    title: 'bklyn clay',
    about: `Members receive 20% discount on Tryday 
    nights. Trydays for adults happen 
    on the 1st and 3rd Friday of the month and are 
    meant to give beginners a feel for the wheel. 
    BKLYN CLAY is a modern ceramics studio for 
    potters, artists, production clayworkers and 
    hobbyists, with the first community Gas Kiln in Brooklyn.`,
    tags: ['#artclass', '#brooklyn']
  },
  {
    image: barrowGroup,
    title: 'the barrow group',
    about: `Members receive a discount off classes at The 
    Barrow Group Acting School, a performing arts 
    training center and theater company, which 
    counts among its alumni, Anne Hathaway, Denis 
    Hare, Tony Hale and Vera Farmiga. 
    Classes at TBG include voice/speech, acting, 
    film/tv, directing, filmmaking, improv, 
    playwriting/screenwriting.`,
    tags: ['#class', '#acting', '#education']
  },
  {
    image: primeSteakhouse,
    title: 'carnem prime steakhouse',
    about: `Members receive a 15% discount off meals at 
    Carnem Prime Steakhouse, a restaurant in the 
    heart of Park Slope, serving modern American 
    dishes that deftly blend old-classic and new-
    classic steakhouse dining. Â For fish and veggie 
    lovers, Carnem also offers a wide range of 
    seasonal fish, pasta, and vegetables dishes, 
    including a Whole-Roasted Branzino, Yellowtail 
    Sashimi, and a Grilled Caesar Salad.`,
    tags: ['#food', '#culinary', '#wine', '#brooklyn']
  },
  {
    image: loloseafood,
    title: "lolo's seafood",
    about: `Members receive a discount off meals at LoLo's Seafood Shack. LoLo's 
    Seafood Shack serves up 
    a variety of seafood from the coastal comfort 
    foods of the Cape like sauced shrimp to 
    Caribbean street eats such as conch fritters. 
    LoLo's is known for its famous Johnny Cake 
    sandwiches and flavorful and fresh seafood 
    steam-pots.`,
    tags: ['#food', '#caribbean', '#seafood', '#harlem']
  },
  {
    image: leagueOfKitchens,
    title: 'league of kitchens cooking classes',
    about: `Members receive $20 off an "Immersion" 
    workshop with The League of Kitchens, 
    an immersive culinary adventure in NYC where 
    immigrants teach intimate cooking workshops in 
    their homes. Visit www.leagueofkitchens.com`,
    tags: ['#food', '#class', '#culinary', '#education']
  }
];
