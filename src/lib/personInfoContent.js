// ============================================================
// You-page-only info card content.
//
// Same shape as dailyInfoContent.js, but every blurb speaks to a
// PERSON's archetypal energy (a birth chart trait) rather than a
// single day's collective energy. Kept in its own file so nothing
// here can ever leak into or get confused with the Daily page.
//
// Two layers:
//   1. POSITION_INFO — fixed title/subtitle/description for each
//      of the 5 positions. Identical for every seal.
//   2. SEAL_POSITION_TEXT — the seal-specific reading for that
//      seal IN that position (20 seals x 5 positions = 100 cards).
// ============================================================

export const POSITION_INFO = {
  analog: {
    title: 'Analog',
    subtitle: 'The Natural Support',
    description: 'The energy that works easily alongside your Birth Kin. It shows what can support, soften or strengthen your natural way of being.',
  },
  antipode: {
    title: 'Antipode',
    subtitle: 'The Growth Edge',
    description: 'The energy that challenges, stretches or corrects you. It may create tension, but it also prevents your Birth Kin from becoming limited or unbalanced.',
  },
  guide: {
    title: 'Guide',
    subtitle: 'The Higher Direction',
    description: 'The quality that helps lead you forward. It reveals what to trust, strengthen or follow in order to express your Birth Kin well.',
  },
  occult: {
    title: 'Occult',
    subtitle: 'The Hidden Power',
    description: 'The energy working beneath the surface of your chart. It often appears unexpectedly, revealing a deeper strength, gift or possibility when you need it most.',
  },
  birthKin: {
    title: 'Birth Kin',
    subtitle: 'The Core Energy',
    description: 'The central archetype of your chart. This is the energy you are here to embody, understand and express throughout your life.',
  },
};

export const SEAL_POSITION_TEXT = {
  'Red Earth': {
    analog: [
      'Red Earth helps bring you back into balance through movement, fresh surroundings and contact with the physical world. Going for a walk, taking a different route, travelling or trying something new can help shift stagnant energy.',
      'You may feel most like yourself when life has a sense of movement.',
    ],
    antipode: [
      'Red Earth can bring up restlessness or the feeling that you should be somewhere else. You may change direction quickly, struggle to settle or assume that a different place will make everything feel better.',
      'Your challenge is learning the difference between being genuinely called forward and simply wanting to escape what is in front of you.',
    ],
    guide: [
      'Red Earth guides you to work with the natural flow of your life rather than trying to plan every part of it. Pay attention to what keeps coming up, where you feel drawn and when a change of direction feels right.',
      'You often find the way forward simply by getting moving.',
    ],
    occult: [
      'Red Earth gives you a quiet instinct for timing and direction. A chance conversation, unexpected delay or sudden change of plan may lead you somewhere important.',
      'Some of the biggest shifts in your life may begin through moments that first seem like coincidences.',
    ],
    birthKin: [
      'You are naturally drawn towards movement, change and new experiences. Staying in one place, routine or version of yourself for too long can make you feel restless.',
      'Your path tends to unfold as you follow what feels right, even when you cannot fully explain where it is leading you.',
    ],
  },

  'White Mirror': {
    analog: [
      'White Mirror helps bring you back into balance through simplicity, order and directness. Clearing your space, setting a boundary or finishing something properly can help you feel more settled.',
      'You often do well when life feels clean, honest and uncluttered.',
    ],
    antipode: [
      'White Mirror can bring up criticism, rigidity or the need for everything to be right. You may become focused on flaws, hold yourself to impossible standards or struggle to accept people as they are.',
      'Your challenge is learning that clarity does not need to become judgement.',
    ],
    guide: [
      'White Mirror guides you through honesty, clear reflection and strong boundaries. When you feel lost, look at what keeps repeating in your relationships, reactions and choices.',
      'The pattern itself often shows you what needs to change.',
    ],
    occult: [
      'White Mirror gives you a hidden ability to recognise yourself through other people. Certain relationships may reflect parts of you that are difficult to see alone.',
      'Even uncomfortable reactions can reveal something important about what you are ready to understand.',
    ],
    birthKin: [
      'You have a natural ability to see what is really going on. Patterns, inconsistencies and unspoken truths can be hard for you to ignore. At your best, you bring clarity and honesty into the spaces you enter.',
      'Your work is learning how to tell the truth without becoming too harsh with yourself or others.',
    ],
  },

  'Blue Storm': {
    analog: [
      'Blue Storm helps bring you back into balance through movement, release and clearing built up energy. Exercise, cleaning, crying, dancing or finishing something you have been avoiding can help you feel like yourself again.',
      'You often need an outlet before you can think clearly.',
    ],
    antipode: [
      'Blue Storm can bring up overwhelm, emotional intensity or the feeling that everything needs to change at once. You may push for a breakthrough before you are ready or create more chaos when life already feels unstable.',
      'Your challenge is learning how to transform without destroying what still has value.',
    ],
    guide: [
      'Blue Storm guides you to trust change when something has clearly run its course. When you feel stuck, notice what needs to be released, moved or done differently.',
      'You often find your way forward by taking one honest action that shifts the energy.',
    ],
    occult: [
      'Blue Storm gives you a hidden ability to regenerate after difficult periods. What first feels like a breakdown may become the beginning of a major shift.',
      'You may not always realise your own strength until life asks you to rebuild.',
    ],
    birthKin: [
      'You carry a strong energy for change, renewal and transformation. Your life may move through periods of intensity where old ways of living no longer fit. At your best, you help bring movement to what has become stuck.',
      'Your work is learning how to create change without burning yourself out in the process.',
    ],
  },

  'Yellow Sun': {
    analog: [
      'Yellow Sun helps bring you back into balance through warmth, simplicity and genuine enjoyment. Time outside, sunlight, rest or doing something that makes you feel alive can help restore your energy.',
      'You tend to thrive when there is space for joy in your everyday life.',
    ],
    antipode: [
      'Yellow Sun can bring up pressure to stay bright, strong or positive even when you are struggling. You may ignore difficult feelings or expect yourself to rise above things too quickly.',
      'Your challenge is learning that your light does not disappear when you allow yourself to have a hard day.',
    ],
    guide: [
      'Yellow Sun guides you towards what feels clear, honest and life giving. When you feel lost, notice what brings you back to yourself and what leaves you feeling drained.',
      'The right path often feels simpler than the one your mind is trying to complicate.',
    ],
    occult: [
      'Yellow Sun gives you a quiet ability to bring clarity and warmth into difficult moments. Even when you do not realise it, your presence may help other people feel more hopeful or see things differently.',
      'Some of your greatest strength appears when you stop trying to shine and simply allow yourself to be fully present.',
    ],
    birthKin: [
      'You carry a natural warmth, clarity and life force that other people can feel. At your best, you bring lightness, perspective and a sense of what really matters.',
      'Your work is learning to stay open and generous without feeling responsible for keeping everything positive.',
    ],
  },

  'Red Dragon': {
    analog: [
      'Red Dragon helps bring you back into balance through rest, food, warmth and simple acts of care. Cooking, slowing down or spending time somewhere that feels safe can help you feel more like yourself.',
      'You tend to function best when your foundations are strong.',
    ],
    antipode: [
      'Red Dragon can bring up fear around not having enough support, love or security. You may give too much, struggle to receive or expect yourself to carry everything alone.',
      'Your challenge is learning to ask for what you need without feeling weak or guilty.',
    ],
    guide: [
      'Red Dragon guides you back to what is most essential. When life feels confusing, start with your body, your home and your basic needs.',
      'You often find your direction once you feel properly supported and grounded.',
    ],
    occult: [
      'Red Dragon gives you a hidden ability to create safety for others, often without needing to say much. People may feel held, protected or calmer around you.',
      'This gift becomes strongest when you allow yourself to receive the same care you so easily give.',
    ],
    birthKin: [
      'You carry a strong instinct to care, protect and create safety for the people around you. You may naturally take on the role of provider, nurturer or steady presence.',
      'Your work is learning to offer care without forgetting that you also need support, rest and nourishment.',
    ],
  },

  'White Wind': {
    analog: [
      'White Wind helps bring you back into balance through expression, conversation and breath. Journalling, speaking with someone you trust or giving yourself quiet time to think can help clear your mind.',
      'You often feel better once something that has been circling inside you has somewhere to go.',
    ],
    antipode: [
      'White Wind can bring up overthinking, mixed messages or difficulty saying what you actually mean. You may talk around your feelings, react too quickly or become frustrated when people misunderstand you.',
      'Your challenge is learning that clarity often comes from slowing down, not saying more.',
    ],
    guide: [
      'White Wind guides you through honest communication and deep listening. When you feel unsure, writing, talking something through or taking time to hear your own thoughts can help.',
      'Your direction often becomes clearer once you find the words for what is really going on.',
    ],
    occult: [
      'White Wind gives you a hidden ability to say the right thing at the right time. Your words may affect people more deeply than you realise, or an idea may move through you before you fully understand its importance.',
      'Some of your clearest insight arrives when you stop trying to force it.',
    ],
    birthKin: [
      'You are naturally connected to words, ideas and the space between what is said and what is felt. Communication is one of the main ways you make sense of yourself and the world around you.',
      'Your work is learning to speak clearly without losing yourself in overthinking, explaining or trying to be understood by everyone.',
    ],
  },

  'Blue Night': {
    analog: [
      'Blue Night helps bring you back into balance through rest, imagination and time away from outside noise. Journalling, daydreaming or spending time alone can help you reconnect with what you actually want.',
      'You often need quiet before you can hear your own vision clearly.',
    ],
    antipode: [
      'Blue Night can bring up fear around money, security or whether there will be enough. You may focus on what is missing, retreat into your own world or struggle to believe that what you want is possible.',
      'Your challenge is learning to protect your dreams without letting fear make them smaller.',
    ],
    guide: [
      'Blue Night guides you inward. When you feel unsure, give yourself space to think, dream and notice what keeps returning to your mind.',
      'Your direction often becomes clearer when you stop looking outside yourself for the answer.',
    ],
    occult: [
      'Blue Night gives you a hidden ability to see possibilities that other people may overlook. Dreams, sudden ideas and inner images can guide you towards something meaningful.',
      'What begins in your imagination may become far more important than it first appears.',
    ],
    birthKin: [
      'You have a rich inner world and a natural ability to imagine what could be possible. Dreams, ideas and private visions may shape your life more than other people realise.',
      'Your work is learning to trust your inner world without becoming disconnected from the practical steps needed to bring it into reality.',
    ],
  },

  'Yellow Seed': {
    analog: [
      'Yellow Seed helps bring you back into balance through small, steady acts of progress. Starting something, tending to a habit, clearing your space or spending time in nature can help you feel more focused.',
      'You often do best when you have something meaningful to nurture.',
    ],
    antipode: [
      'Yellow Seed can bring up impatience, self doubt or frustration that you are not further ahead. You may compare your progress to other people or put too much pressure on yourself to reach your potential.',
      'Your challenge is learning that growth cannot always be rushed.',
    ],
    guide: [
      'Yellow Seed guides you to be intentional with your time and energy. When you feel unsure, notice what you are feeding through your attention, habits and choices.',
      'Your path becomes clearer when you focus on what is genuinely worth growing.',
    ],
    occult: [
      'Yellow Seed gives you a hidden ability to recognise potential in people, ideas and opportunities. You may sense that something is worth pursuing before there is much proof.',
      'Some of the most important parts of your life may begin quietly and grow over time.',
    ],
    birthKin: [
      'You carry a natural energy for growth, potential and becoming. You may be able to see what something could turn into long before it is fully formed.',
      'Your work is learning to trust your own timing and give your ideas, abilities and relationships the patience they need to develop.',
    ],
  },

  'Red Serpent': {
    analog: [
      'Red Serpent helps bring you back into balance through movement, touch and connection with your body. Walking, stretching, dancing, swimming or doing something physical can help release built up tension.',
      'You often think more clearly once your body has had somewhere to put its energy.',
    ],
    antipode: [
      'Red Serpent can bring up defensiveness, reactivity or the feeling that you always need to protect yourself. You may stay alert for danger even when it is safe to soften.',
      'Your challenge is learning the difference between a true instinct and a fear response shaped by the past.',
    ],
    guide: [
      'Red Serpent guides you through instinct and direct experience. When you feel unsure, notice what gives you energy, what drains you and how your body responds.',
      'Your direction often becomes clearer when you stop overthinking and come back to what you can physically feel.',
    ],
    occult: [
      'Red Serpent gives you a hidden ability to read situations through your body. A gut feeling, physical sensation or sudden shift in energy may tell you something before your mind catches up.',
      'Some of your strongest guidance arrives through signals that are difficult to put into words.',
    ],
    birthKin: [
      'You are deeply connected to instinct, physical energy and the wisdom of the body. You may sense what feels right or wrong before you can explain why.',
      'Your work is learning to trust these signals without letting fear, tension or survival mode make every decision for you.',
    ],
  },

  'White Worldbridger': {
    analog: [
      'White Worldbridger helps bring you back into balance through clearing, finishing and letting go. Cleaning out your space, ending an old commitment or having an honest conversation can help you feel lighter.',
      'You often need room around you before you can see what comes next.',
    ],
    antipode: [
      'White Worldbridger can bring up fear of loss, attachment or difficulty accepting that something is over. You may hold on to relationships, plans or identities because the unknown feels uncomfortable.',
      'Your challenge is learning to trust that not everything needs to be carried forward.',
    ],
    guide: [
      'White Worldbridger guides you to loosen your grip when something has clearly run its course. When you feel stuck, notice what you may be trying to hold together out of fear or familiarity.',
      'Your direction often becomes clearer once you make space for change.',
    ],
    occult: [
      'White Worldbridger gives you a hidden ability to move between different people, worlds and stages of life. You may become an important connection point for others, helping them through change without always realising it.',
      'Some of your deepest strength appears when life asks you to begin again.',
    ],
    birthKin: [
      'You carry a natural relationship with change, endings and transition. Life may ask you to let go of people, places or versions of yourself more often than others.',
      'Your work is learning that release does not always mean loss. Sometimes it is what allows the next part of your life to begin.',
    ],
  },

  'Blue Hand': {
    analog: [
      'Blue Hand helps bring you back into balance through making, repairing and completing. Cooking, drawing, gardening, cleaning or finishing a small task can help you feel clearer and more capable.',
      'You often feel best when your energy has somewhere practical to go.',
    ],
    antipode: [
      'Blue Hand can bring up frustration, perfectionism or the feeling that you should know how to fix everything. You may take responsibility for problems that are not yours or focus too heavily on what is still unfinished.',
      'Your challenge is learning when to help and when to let something unfold without your intervention.',
    ],
    guide: [
      'Blue Hand guides you through practical action. When you feel unsure, do something small and useful rather than waiting for complete clarity.',
      'You often understand what something means by working with it directly.',
    ],
    occult: [
      'Blue Hand gives you a hidden ability to bring healing through what you do. A skill, touch, insight or simple act of care may affect someone more deeply than you realise.',
      'Some of your greatest wisdom comes from what life has taught you through experience.',
    ],
    birthKin: [
      'You carry a natural need to understand, improve and work things through. You may be drawn to healing, making, fixing or learning through direct experience.',
      'Your work is learning that not everything needs to be solved before you can feel whole.',
    ],
  },

  'Yellow Star': {
    analog: [
      'Yellow Star helps bring you back into balance through art, beauty and your surroundings. Getting dressed in something you love, rearranging a room, listening to music or making something with your hands can help you feel more like yourself.',
      'Creativity is not an extra for you. It is often part of how you regulate and return to yourself.',
    ],
    antipode: [
      'Yellow Star can bring up perfectionism, self criticism or the feeling that you are not beautiful, talented or accomplished enough. You may compare yourself to other people or become too focused on how things appear.',
      'Your challenge is learning to create from genuine enjoyment rather than the need for approval.',
    ],
    guide: [
      'Yellow Star guides you through beauty, creativity and a sense of what feels right. When you feel unsure, notice what brings more harmony into your body, your surroundings or the way you are living.',
      'Your direction often becomes clearer when life feels more like an honest expression of you.',
    ],
    occult: [
      'Yellow Star gives you a hidden ability to bring beauty and harmony into places that feel dull, disconnected or unfinished. Your taste, ideas or creative presence may affect people more than you realise.',
      'Some of your strongest gifts appear when you trust what you find beautiful without needing to justify it.',
    ],
    birthKin: [
      'You carry a natural connection to beauty, creativity and harmony. You may notice details that other people miss and feel deeply affected by the way things look, feel and fit together.',
      'Your work is learning to honour your creative eye without turning it into perfectionism or comparison.',
    ],
  },

  'Red Moon': {
    analog: [
      'Red Moon helps bring you back into balance through water, rest and emotional release. Swimming, bathing, crying, journalling or spending time somewhere calm can help clear what has built up.',
      'You often need space for your feelings to move before you can understand them.',
    ],
    antipode: [
      'Red Moon can bring up emotional overwhelm, moodiness or difficulty separating your feelings from other people\u2019s. You may absorb the energy around you or feel swept up in what is happening.',
      'Your challenge is learning to feel deeply without losing your own centre.',
    ],
    guide: [
      'Red Moon guides you through feeling, release and emotional honesty. When you feel unsure, notice what feels heavy, what brings relief and what your body is asking you to let move.',
      'Your direction often becomes clearer once you stop holding everything in.',
    ],
    occult: [
      'Red Moon gives you a hidden ability to help emotion move through yourself and others. People may feel safer expressing what they have been holding around you.',
      'Some of your deepest healing happens when you stop trying to explain a feeling and simply allow it to be felt.',
    ],
    birthKin: [
      'You are naturally sensitive to emotion, atmosphere and what is moving beneath the surface. You may feel things deeply and need regular ways to release what you absorb.',
      'Your work is learning to honour your feelings without letting every emotion decide the direction of your life.',
    ],
  },

  'White Dog': {
    analog: [
      'White Dog helps bring you back into balance through affection, friendship and time with the people or animals you love. Calling someone you trust, sharing a meal or giving and receiving physical affection can help you feel more settled.',
      'You often return to yourself through genuine connection.',
    ],
    antipode: [
      'White Dog can bring up jealousy, disappointment or fear of rejection. You may give too much, hold on too tightly or expect people to show love in the same way you do.',
      'Your challenge is learning to stay open without abandoning your own needs.',
    ],
    guide: [
      'White Dog guides you through the heart. When you feel unsure, notice where there is trust, warmth and mutual care.',
      'Your direction often becomes clearer through honest connection with the people who make you feel safe enough to be yourself.',
    ],
    occult: [
      'White Dog gives you a hidden ability to create deep loyalty and emotional safety. People may feel seen, accepted or protected around you.',
      'Some of your greatest strength appears when you let love be simple, honest and freely given.',
    ],
    birthKin: [
      'You carry a deep need for love, loyalty and genuine connection. Relationships are rarely casual for you, and you may feel most secure when you know where you stand with someone.',
      'Your work is learning to love deeply without losing yourself inside other people.',
    ],
  },

  'Blue Monkey': {
    analog: [
      'Blue Monkey helps bring you back into balance through laughter, play and doing something without needing it to be productive. Spending time with people who make you laugh, making something for fun or changing your usual approach can help you feel more like yourself.',
      'You often find clarity once the pressure comes off.',
    ],
    antipode: [
      'Blue Monkey can bring up distraction, immaturity or the urge to avoid anything that feels heavy. You may joke your way out of difficult conversations, lose interest quickly or struggle to stay with something once it stops being fun.',
      'Your challenge is learning to keep your lightness without becoming careless.',
    ],
    guide: [
      'Blue Monkey guides you through curiosity, experimentation and a willingness to try something different. When you feel stuck, loosen your grip on how things are supposed to work.',
      'Your direction often becomes clearer when you let yourself play with the possibilities.',
    ],
    occult: [
      'Blue Monkey gives you a hidden ability to reveal truth through humour, surprise and a different way of seeing things. What you say lightly may carry more meaning than people first realise.',
      'Some of your strongest insights appear when you stop trying to be serious enough to find them.',
    ],
    birthKin: [
      'You carry a natural connection to play, humour and possibility. You may see through situations quickly and notice when life is being taken too seriously.',
      'Your work is learning to stay light and curious without using distraction or humour to avoid what needs your attention.',
    ],
  },

  'Yellow Human': {
    analog: [
      'Yellow Human helps bring you back into balance through making one clear, honest choice. Saying no, changing your mind or stepping away from outside opinions can help you feel more like yourself.',
      'You often regain your power when you stop trying to make everyone understand your decisions.',
    ],
    antipode: [
      'Yellow Human can bring up indecision, people pleasing or the feeling that someone else has too much influence over you. You may second guess yourself or shape your choices around what will keep other people happy.',
      'Your challenge is learning to listen without losing your own voice.',
    ],
    guide: [
      'Yellow Human guides you to make conscious choices. When you feel unsure, notice where you are looking outside yourself for permission or approval.',
      'Your direction often becomes clearer when you come back to what you genuinely believe.',
    ],
    occult: [
      'Yellow Human gives you a hidden ability to influence the way other people think and choose. Your words, decisions and way of living may affect people more than you realise.',
      'Some of your strongest leadership appears when you trust yourself enough to lead by example.',
    ],
    birthKin: [
      'You carry a strong relationship with choice, influence and free will. Other people\u2019s ideas, expectations and opinions may affect you deeply, but you are here to learn how to think and choose for yourself.',
      'Your work is learning to stay open to guidance without giving away your own judgement.',
    ],
  },

  'Red Skywalker': {
    analog: [
      'Red Skywalker helps bring you back into balance through space, movement and new experiences. Travelling, spending time outside, changing your routine or going somewhere unfamiliar can help you feel more like yourself.',
      'You often need a wider view before you can think clearly.',
    ],
    antipode: [
      'Red Skywalker can bring up restlessness, avoidance or the feeling that life is happening somewhere else. You may keep moving because staying still brings up discomfort.',
      'Your challenge is learning the difference between genuine exploration and running away from what needs your attention.',
    ],
    guide: [
      'Red Skywalker guides you through curiosity and exploration. When you feel unsure, change your environment, ask a different question or look at the situation from somewhere new.',
      'Your direction often becomes clearer once you step outside your usual way of seeing things.',
    ],
    occult: [
      'Red Skywalker gives you a hidden ability to open new paths for yourself and other people. Your willingness to explore may lead you into places, ideas or opportunities that others would not have found.',
      'Some of your greatest growth begins when you follow what makes life feel larger.',
    ],
    birthKin: [
      'You carry a natural need for space, movement and new experience. You may feel most alive when you are exploring, travelling or stepping beyond what is familiar.',
      'Your work is learning how to keep expanding without always needing to leave your current life behind.',
    ],
  },

  'White Wizard': {
    analog: [
      'White Wizard helps bring you back into balance through stillness, focus and giving something your full attention. Meditation, reading, sitting in nature or spending time without your phone can help you feel more like yourself.',
      'You often reconnect with your power when you stop rushing.',
    ],
    antipode: [
      'White Wizard can bring up impatience, control or the need to influence how other people respond. You may become frustrated when things do not unfold in your timing or try to hold onto a feeling, person or outcome.',
      'Your challenge is learning to stay open without trying to manage everything.',
    ],
    guide: [
      'White Wizard guides you through patience, presence and deep attention. When you feel unsure, slow down and notice what is actually happening rather than rushing to fix it.',
      'Your direction often becomes clearer when you stop forcing an answer.',
    ],
    occult: [
      'White Wizard gives you a hidden ability to shift the atmosphere without needing to do very much. People may feel calmer, more seen or strangely drawn into the present around you.',
      'Some of your strongest influence comes through simply being fully there.',
    ],
    birthKin: [
      'You carry a natural sensitivity to presence, timing and the energy beneath what is being said. You may affect people through the way you listen, hold space or make a moment feel more meaningful.',
      'Your work is learning to trust your quiet power without using control, charm or withdrawal to manage the outcome.',
    ],
  },

  'Blue Eagle': {
    analog: [
      'Blue Eagle helps bring you back into balance through creativity, space and a wider perspective. Writing down your ideas, making a mood board, looking at art or spending time somewhere with a broad view can help clear your mind.',
      'You often feel more like yourself when you can see beyond the immediate problem.',
    ],
    antipode: [
      'Blue Eagle can bring up overthinking, judgement or disappointment when life does not match the picture in your head. You may become too focused on the future or critical of how slowly things are unfolding.',
      'Your challenge is learning to hold a vision without rejecting where you are now.',
    ],
    guide: [
      'Blue Eagle guides you through perspective, imagination and long term vision. When you feel unsure, step back and look at the situation as a whole.',
      'Your direction often becomes clearer when you remember what you are trying to create, rather than getting lost in every small detail.',
    ],
    occult: [
      'Blue Eagle gives you a hidden ability to see possibilities that other people may miss. An idea, image or sudden insight may show you where something could go before there is much proof.',
      'Some of your strongest guidance arrives as a vision you cannot quite explain, but cannot ignore.',
    ],
    birthKin: [
      'You carry a natural ability to see the bigger picture. You may sense where something is heading long before other people do, and you often need a strong vision to feel connected to what you are doing.',
      'Your work is learning to trust what you can see without becoming disconnected from the reality in front of you.',
    ],
  },

  'Yellow Warrior': {
    analog: [
      'Yellow Warrior helps bring you back into balance through learning, honest conversation and doing something that makes you feel brave. Researching an idea, speaking up or taking one step towards something intimidating can help you feel more capable.',
      'Your confidence often grows once you begin.',
    ],
    antipode: [
      'Yellow Warrior can bring up overthinking, defensiveness or the need to prove that you are right. You may question yourself until you feel stuck or turn every situation into something you need to solve.',
      'Your challenge is learning when a question is opening your mind and when it is keeping you from moving forward.',
    ],
    guide: [
      'Yellow Warrior guides you through courage and curiosity. When you feel unsure, ask the question you have been avoiding and look at what you genuinely want to understand.',
      'Your direction often becomes clearer when you are willing to face what feels uncomfortable.',
    ],
    occult: [
      'Yellow Warrior gives you a hidden ability to challenge old beliefs and open new ways of thinking. The questions you ask may affect other people more deeply than you realise.',
      'Some of your greatest strength appears when you are willing to admit that there may be more to discover.',
    ],
    birthKin: [
      'You carry a natural need to question, understand and get to the truth of things. You may be drawn to ideas, challenges and conversations that make you think more deeply.',
      'Your work is learning to use your mind as a tool for clarity without getting trapped in doubt or the need to have every answer.',
    ],
  },
};
