import React, { useEffect, useState } from "react";

interface BibleVerseProps {
  livro: string;
  capitulo: number;
  versiculo: number | null;
  versao?: string;
}

// Dados de exemplo para simular o conteúdo da Bíblia em diferentes versões
const versiculosExemploPorVersao: Record<string, any> = {
  nvi: {
    genesis: {
      1: {
        1: "No princípio, Deus criou os céus e a terra.",
        2: "Era a terra sem forma e vazia; trevas cobriam a face do abismo, e o Espírito de Deus se movia sobre a face das águas.",
        3: "Disse Deus: 'Haja luz', e houve luz.",
        4: "Deus viu que a luz era boa, e separou a luz das trevas.",
        5: "Deus chamou à luz Dia, e às trevas chamou Noite. Passaram-se a tarde e a manhã; esse foi o primeiro dia.",
        6: "Disse Deus: 'Haja um firmamento no meio das águas, e separação entre águas e águas'.",
        7: "Fez, pois, Deus o firmamento, e separação entre as águas debaixo do firmamento e as águas sobre o firmamento. E assim se fez.",
        8: "E chamou Deus ao firmamento Céus. Passaram-se a tarde e a manhã, o segundo dia.",
        9: "Disse também Deus: 'Ajuntem-se as águas debaixo dos céus num só lugar, e apareça a porção seca'. E assim se fez.",
        10: "À porção seca chamou Deus Terra, e ao ajuntamento das águas, Mares. E viu Deus que isso era bom."
      },
      2: {
        1: "Assim foram concluídos os céus e a terra, e tudo o que neles há.",
        2: "No sétimo dia Deus já havia concluído a obra que realizara, e nesse dia descansou.",
        3: "Abençoou Deus o sétimo dia e o santificou, porque nele descansou de toda a obra que realizara na criação.",
        4: "Esta é a história da criação dos céus e da terra. Quando o Senhor Deus fez a terra e os céus,",
        5: "ainda nenhum arbusto do campo havia surgido na terra, e nenhuma planta do campo havia brotado; porque o Senhor Deus ainda não tinha feito chover sobre a terra, e também não havia homem para cultivar o solo."
      },
      7: {
        1: "O Senhor disse a Noé: 'Entre na arca, você e toda a sua família, porque você é o único justo que encontrei nesta geração.'",
        2: "De todos os animais puros, leve sete casais, macho e fêmea; dos impuros, um casal, macho e fêmea;",
        3: "e também das aves do céu, sete casais, macho e fêmea, para preservar as suas espécies na terra.",
        4: "Daqui a sete dias farei chover sobre a terra durante quarenta dias e quarenta noites, e destruirei da face da terra todos os seres vivos que fiz.'",
        5: "E Noé fez tudo como o Senhor lhe tinha ordenado.",
        6: "Noé tinha seiscentos anos de idade quando as águas do dilúvio vieram sobre a terra.",
        7: "Ele entrou na arca com seus filhos, sua mulher e as mulheres de seus filhos, por causa das águas do dilúvio.",
        8: "Dos animais puros e dos impuros, das aves e de todos os seres que se movem sobre a terra,",
        9: "vieram casais, macho e fêmea, a Noé, e entraram na arca, como Deus tinha ordenado a Noé.",
        10: "Depois de sete dias, as águas do dilúvio vieram sobre a terra."
      }
    },
    exodo: {
      1: {
        1: "São estes os nomes dos filhos de Israel que entraram no Egito com Jacó, cada um com sua família:",
        2: "Rúben, Simeão, Levi e Judá;",
        3: "Issacar, Zebulom e Benjamim;",
        4: "Dã e Naftali; Gade e Aser.",
        5: "Os descendentes de Jacó eram setenta ao todo; José, porém, já estava no Egito."
      }
    }
  },
  acf: {
    genesis: {
      1: {
        1: "No princípio criou Deus os céus e a terra.",
        2: "E a terra era sem forma e vazia; e havia trevas sobre a face do abismo; e o Espírito de Deus se movia sobre a face das águas.",
        3: "E disse Deus: Haja luz; e houve luz.",
        4: "E viu Deus que era boa a luz; e fez Deus separação entre a luz e as trevas.",
        5: "E Deus chamou à luz Dia; e às trevas chamou Noite. E foi a tarde e a manhã, o dia primeiro.",
        6: "E disse Deus: Haja uma expansão no meio das águas, e haja separação entre águas e águas.",
        7: "E fez Deus a expansão, e fez separação entre as águas que estavam debaixo da expansão e as águas que estavam sobre a expansão; e assim foi.",
        8: "E chamou Deus à expansão Céus, e foi a tarde e a manhã, o dia segundo.",
        9: "E disse Deus: Ajuntem-se as águas debaixo dos céus num lugar, e apareça a porção seca; e assim se fez.",
        10: "E chamou Deus à porção seca Terra; e ao ajuntamento das águas chamou Mares; e viu Deus que isso era bom."
      },
      2: {
        1: "Assim os céus, a terra e todo o seu exército foram acabados.",
        2: "E havendo Deus acabado no dia sétimo a obra que fizera, descansou no sétimo dia de toda a sua obra, que tinha feito.",
        3: "E abençoou Deus o dia sétimo e o santificou; porque nele descansou de toda a sua obra que tinha feito.",
        4: "Estas são as origens dos céus e da terra, quando foram criados; no dia em que o Senhor Deus fez a terra e os céus,",
        5: "E toda a planta do campo que ainda não estava na terra, e toda a erva do campo que ainda não brotava; porque ainda o Senhor Deus não tinha feito chover sobre a terra, e também não havia homem para lavrar o solo."
      },
      7: {
        1: "Depois disse o SENHOR a Noé: Entra tu e toda a tua casa na arca, porque tenho visto que és justo diante de mim nesta geração.",
        2: "De todo animal limpo tomarás para ti sete e sete, o macho e sua fêmea; mas dos animais que não são limpos, um casal: o macho e sua fêmea;",
        3: "também das aves dos céus sete e sete, macho e fêmea, para preservar em vida sua espécie sobre a face de toda a terra.",
        4: "Porque, passados ainda sete dias, farei chover sobre a terra quarenta dias e quarenta noites; e destruirei de sobre a face da terra toda a substância que fiz.",
        5: "E fez Noé conforme a tudo o que o SENHOR lhe ordenara.",
        6: "E era Noé da idade de seiscentos anos, quando o dilúvio das águas veio sobre a terra.",
        7: "E entrou Noé e seus filhos, e sua mulher, e as mulheres de seus filhos com ele na arca, por causa das águas do dilúvio.",
        8: "Dos animais limpos e dos animais que não são limpos, e das aves, e de todo o réptil sobre a terra,",
        9: "vieram casais, macho e fêmea, a Noé, e entraram na arca, como Deus tinha ordenado a Noé.",
        10: "Depois de sete dias, vieram sobre a terra as águas do dilúvio."
      }
    },
    exodo: {
      1: {
        1: "Estes, pois, são os nomes dos filhos de Israel, que entraram no Egito com Jacó; cada um entrou com sua família:",
        2: "Rúben, Simeão, Levi, e Judá;",
        3: "Issacar, Zebulom, e Benjamim;",
        4: "Dã e Naftali, Gade e Aser.",
        5: "Todas as almas, pois, que procederam dos lombos de Jacó, foram setenta almas; José, porém, estava no Egito."
      }
    }
  },
  ara: {
    genesis: {
      1: {
        1: "No princípio, criou Deus os céus e a terra.",
        2: "A terra, porém, estava sem forma e vazia; havia trevas sobre a face do abismo, e o Espírito de Deus pairava por sobre as águas.",
        3: "Disse Deus: 'Haja luz'; e houve luz.",
        4: "E viu Deus que a luz era boa; e fez separação entre a luz e as trevas.",
        5: "Chamou Deus à luz Dia e às trevas, Noite. Houve tarde e manhã, o primeiro dia.",
        6: "E disse Deus: 'Haja firmamento no meio das águas, e haja separação entre águas e águas'.",
        7: "Fez, pois, Deus o firmamento e separação entre as águas debaixo do firmamento e as águas sobre o firmamento. E assim se fez.",
        8: "E chamou Deus ao firmamento C��us. Houve tarde e manhã, o segundo dia.",
        9: "Disse também Deus: 'Ajuntem-se as águas debaixo dos c��us num só lugar, e apareça a porção seca'; E assim se fez.",
        10: "À porção seca chamou Deus Terra; e ao ajuntamento das águas, Mares; e viu Deus que isso era bom."
      },
      2: {
        1: "Assim, pois, foram acabados os céus e a terra e todo o seu exército.",
        2: "E, havendo Deus terminado no dia sétimo a sua obra, que fizera, descansou nesse dia de toda a sua obra que tinha feito.",
        3: "E abençoou Deus o dia sétimo e o santificou; porque nele descansou de toda a sua obra que tinha feito.",
        4: "Esta é a gênese dos céus e da terra quando foram criados, quando o SENHOR Deus os criou.",
        5: "Não havia ainda nenhuma planta do campo na terra, pois ainda nenhuma erva do campo havia brotado; porque o SENHOR Deus não fizera chover sobre a terra, e também não havia homem para lavrar o solo."
      },
      7: {
        1: "Disse o SENHOR a Noé: Entra na arca, tu e toda a tua casa, porque reconheço que tens sido justo diante de mim no meio desta geração.",
        2: "De todo animal limpo levarás contigo sete pares: o macho e sua fêmea; mas dos animais imundos, um casal: o macho e sua fêmea.",
        3: "Também das aves do céu, sete pares: macho e fêmea; para se conservar a semente sobre a face da terra.",
        4: "Porque, daqui a sete dias, farei chover sobre a terra durante quarenta dias e quarenta noites; e da superfície da terra exterminarei todos os seres que fiz.",
        5: "E tudo fez Noé segundo o SENHOR lhe ordenara.",
        6: "Tinha Noé seiscentos anos de idade, quando o dilúvio inundaram a terra.",
        7: "Por causa das águas do dilúvio, entrou Noé na arca, ele com seus filhos, sua mulher e as mulheres de seus filhos.",
        8: "Dos animais limpos e dos animais imundos, das aves e de todos os répteis sobre a terra,",
        9: "entraram de dois em dois para Noé na arca, macho e fêmea, como Deus lhe ordenara.",
        10: "E aconteceu que, passados sete dias, vieram sobre a terra as águas do dilúvio."
      }
    },
    exodo: {
      1: {
        1: "Estes são os nomes dos filhos de Israel que entraram no Egito com Jacó; cada um entrou com sua família:",
        2: "Rúben, Simeão, Levi e Judá,",
        3: "Issacar, Zebulom e Benjamim,",
        4: "Dã e Naftali, Gade e Aser.",
        5: "Todas as pessoas que descenderam de Jacó eram setenta. José já estava no Egito."
      }
    }
  },
  naa: {
    genesis: {
      1: {
        1: "No princípio, Deus criou os céus e a terra.",
        2: "A terra estava sem forma e vazia, e havia trevas sobre a face do abismo, mas o Espírito de Deus pairava sobre a face das águas.",
        3: "Disse Deus: 'Haja luz!' E houve luz.",
        4: "Deus viu que a luz era boa e separou a luz das trevas.",
        5: "Deus chamou à luz 'dia' e às trevas, 'noite'. Houve tarde e manhã: o primeiro dia.",
        6: "Disse Deus: 'Haja um firmamento no meio das águas, e haja separação entre águas e águas'.",
        7: "Deus fez o firmamento e separou as águas que ficavam abaixo do firmamento das que ficavam acima. E assim se fez.",
        8: "Ao firmamento Deus chamou 'céu'. Houve tarde e manhã: o segundo dia.",
        9: "Disse Deus: 'Ajuntem-se num só lugar as águas que estão debaixo do céu, e apareça a parte seca'; E assim se fez.",
        10: "À parte seca Deus chamou 'terra', e ao ajuntamento das águas, 'mares'. E Deus viu que isso era bom."
      },
      2: {
        1: "Assim foram terminados os céus, a terra e todo o seu exército.",
        2: "E, havendo Deus terminado no dia sétimo a sua obra, que fizera, descansou nesse dia de toda a sua obra que tinha feito.",
        3: "E abençoou o sétimo dia e o santificou; porque nele descansou de toda a obra que, como Criador, fizera.",
        4: "Esta é a gênese dos céus e da terra quando foram criados, quando o SENHOR Deus os criou.",
        5: "Não havia ainda nenhuma planta do campo na terra, pois ainda nenhuma erva do campo havia brotado; porque o SENHOR Deus não fizera chover sobre a terra, nem havia homem para lavrar o solo."
      },
      7: {
        1: "Depois o SENHOR disse a Noé: 'Entre na arca, você e toda a sua família, porque você é a única pessoa desta geração que eu reconheço como justa.'",
        2: "De todo animal limpo levarás contigo sete pares, o macho e sua fêmea; mas dos animais impuros, um par, o macho e sua fêmea;",
        3: "também das aves do céu, sete pares, macho e fêmea, para se conservar a semente sobre a face da terra.",
        4: "Porque, daqui a sete dias, farei chover sobre a terra durante quarenta dias e quarenta noites; e eliminarei da face da terra todos os seres que fiz.'",
        5: "E Noé fez conforme tudo o que o SENHOR lhe havia ordenado.",
        6: "Tinha Noé seiscentos anos de idade quando o dilúvio veio sobre a terra.",
        7: "Noé entrou na arca, com seus filhos, sua mulher e as mulheres de seus filhos, por causa das águas do dilúvio.",
        8: "Dos animais limpos e dos animais impuros, das aves e de todos os répteis sobre a terra,",
        9: "entraram para junto de Noé na arca, de dois em dois, macho e fêmea, como Deus lhe ordenara.",
        10: "Depois de sete dias, vieram as águas do dilúvio sobre a terra."
      }
    },
    exodo: {
      1: {
        1: "Estes são os nomes dos filhos de Israel que foram com Jacó para o Egito, cada um com a sua família:",
        2: "Rúben, Simeão, Levi, Judá,",
        3: "Issacar, Zebulom, Benjamim,",
        4: "Dã, Naftali, Gade e Aser.",
        5: "O total dos descendentes de Jacó foi de setenta pessoas. José já estava no Egito."
      }
    }
  },
  ntlh: {
    genesis: {
      1: {
        1: "No começo Deus criou os céus e a terra.",
        2: "A terra estava sem forma e vazia; a escuridão cobria o abismo, e o Espírito de Deus se movia por cima da água.",
        3: "Então Deus disse: 'Que haja luz!' e a luz começou a existir.",
        4: "Deus viu que a luz era boa e a separou da escuridão.",
        5: "E Deus chamou a luz de 'dia' e a escuridão de 'noite'. A noite passou, e a manhã chegou. Esse foi o primeiro dia.",
        6: "Então Deus disse: 'Que haja uma divisão entre as águas, para separá-las em duas partes!'",
        7: "E assim aconteceu. Deus fez uma divisão e separou as águas que estavam em baixo da divisão das que estavam em cima.",
        8: "Deus chamou a divisão de 'céu'. A noite passou, e a manhã chegou. Esse foi o segundo dia.",
        9: "Então Deus disse: 'Que as águas que estão debaixo do céu se ajuntem num só lugar, para que apareça a terra seca!' E assim aconteceu.",
        10: "Deus chamou a terra seca de 'terra' e as águas que se ajuntaram de 'mar'. E Deus viu que o que havia feito era bom."
      },
      2: {
        1: "Foi assim que Deus terminou de criar o céu e a terra e tudo o que há neles.",
        2: "No sétimo dia Deus acabou de fazer todas as coisas que tinha criado e descansou.",
        3: "Ele abençoou o sétimo dia e o santificou; porque nele descansou de toda a obra que, como Criador, fizera.",
        4: "Foi essa a história da criação do céu e da terra. Quando o SENHOR Deus fez o céu e a terra,",
        5: "não havia ainda na terra nenhum arbusto do campo, e as plantas do campo ainda não tinham brotado. Pois o SENHOR ainda não tinha feito chover, e não havia ninguém para cultivar a terra."
      },
      7: {
        1: "O SENHOR Deus disse a Noé: 'Entre na barca com toda a sua família, pois você é a única pessoa desta geração que eu reconheço como justa.'",
        2: "E disse mais: 'Leve com você sete casais de cada espécie de animais que servem para o sacrifício e um casal de cada espécie que não serve para o sacrifício.'",
        3: "'Leve também sete casais de cada espécie de aves. Faça isso para que todas as espécies de animais e aves continuem vivas na terra.'",
        4: "'Pois daqui a sete dias vou fazer que chova durante quarenta dias e quarenta noites e vou destruir todos os seres vivos que criei.'",
        5: "E Noé fez tudo o que o SENHOR havia mandado.",
        6: "Noé tinha seiscentos anos de idade quando veio o dilúvio sobre a terra.",
        7: "Para escapar das águas do dilúvio, Noé entrou na barca com a sua mulher, os seus filhos e as suas noras.",
        8: "Casais de animais puros e impuros, de aves e de todos os répteis sobre a terra",
        9: "entraram na barca com Noé, como Deus tinha ordenado.",
        10: "E, como Deus tinha dito, aconteceu que depois de sete dias veio o dilúvio sobre a terra."
      }
    },
    exodo: {
      1: {
        1: "Estes são os nomes dos israelitas que foram com Jacó para o Egito, cada um com a sua família:",
        2: "Rúben, Simeão, Levi, Judá,",
        3: "Issacar, Zebulom, Benjamim,",
        4: "Dã, Naftali, Gade e Aser.",
        5: "Ao todo, os descendentes de Jacó eram setenta pessoas. José já estava no Egito."
      }
    }
  },
  kjv: {
    genesis: {
      1: {
        1: "In the beginning God created the heaven and the earth.",
        2: "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.",
        3: "And God said, Let there be light: and there was light.",
        4: "And God saw the light, that it was good: and God divided the light from the darkness.",
        5: "And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day.",
        6: "And God said, Let there be a firmament in the midst of the waters, and let it divide the waters from the waters.",
        7: "And God made the firmament, and divided the waters which were under the firmament from the waters which were above the firmament: and it was so.",
        8: "And God called the firmament Heaven. And the evening and the morning were the second day.",
        9: "And God said, Let the waters under the heaven be gathered together unto one place, and let the dry land appear: and it was so.",
        10: "And God called the dry land Earth; and the gathering together of the waters called he Seas: and God saw that it was good."
      },
      2: {
        1: "Thus the heavens and the earth were finished, and all the host of them.",
        2: "And on the seventh day God ended his work which he had made; and he rested on the seventh day from all his work which he had made.",
        3: "And God blessed the seventh day and sanctified it: because that in it he had rested from all his work which God created and made.",
        4: "These are the generations of the heavens and of the earth when they were created, in the day that the LORD God made the earth and the heavens,",
        5: "And every plant of the field before it was in the earth, and every herb of the field before it grew: for the LORD God had not caused it to rain upon the earth, and there was not a man to till the ground."
      },
      7: {
        1: "And the LORD said unto Noah, Come thou and all thy house into the ark; for thee have I seen righteous before me in this generation.",
        2: "Of every clean beast thou shalt take to thee by sevens, the male and his female: and of beasts that are not clean by two, the male and his female.",
        3: "Of fowls also of the air by sevens, the male and the female; to keep seed alive upon the face of all the earth.",
        4: "For yet seven days, and I will cause it to rain upon the earth forty days and forty nights; and every living substance that I have made will I destroy from off the face of the earth.",
        5: "And Noah did according unto all that the LORD commanded him.",
        6: "And Noah was six hundred years old when the flood of waters was upon the earth.",
        7: "And Noah went in, and his sons, and his wife, and his sons' wives with him, into the ark, because of the waters of the flood.",
        8: "Of clean beasts, and of beasts that are not clean, and of fowls, and of every thing that creepeth upon the earth,",
        9: "There went in two and two unto Noah into the ark, the male and the female, as God had commanded Noah.",
        10: "And it came to pass after seven days, that the waters of the flood were upon the earth."
      }
    },
    exodo: {
      1: {
        1: "Now these are the names of the children of Israel, which came into Egypt; every man and his household came with Jacob.",
        2: "Reuben, Simeon, Levi, and Judah,",
        3: "Issachar, Zebulun, and Benjamin,",
        4: "Dan, and Naphtali, Gad, and Asher.",
        5: "And all the souls that came out of the loins of Jacob were seventy souls: for Joseph was in Egypt already."
      }
    }
  },
  aa: {},
  arc: {},
  ra: {}
};

// Definir o número de versículos por capítulo para cada livro
const versiculosPorCapitulo: Record<string, Record<number, number>> = {
  genesis: {
    1: 31,
    2: 25,
    3: 24,
    4: 22,
    5: 25,
    6: 17,
    7: 16,
    8: 17,
    9: 54,
    10: 46,
    11: 34,
    12: 53,
    13: 22,
    14: 25,
    15: 27,
    16: 24,
    17: 18,
    18: 21,
    19: 22,
    20: 4,
    21: 22,
    22: 42,
    23: 22,
    24: 25,
    25: 38,
    26: 26
  },
  exodo: {
    1: 22,
    2: 25,
    3: 17,
    4: 16,
    5: 17,
    6: 16,
    7: 17,
    8: 16,
    9: 17,
    10: 16,
    11: 16,
    12: 16,
    13: 16,
    14: 16,
    15: 16,
    16: 16,
    17: 16,
    18: 16,
    19: 16,
    20: 16,
    21: 16,
    22: 16,
    23: 16,
    24: 38
  },
  levitico: {
    1: 17,
    2: 16,
    3: 17,
    4: 16,
    5: 17,
    6: 16,
    7: 17,
    8: 16,
    9: 17,
    10: 17,
    11: 17,
    12: 17,
    13: 17,
    14: 17,
    15: 17,
    16: 17,
    17: 17,
    18: 17,
    19: 17,
    20: 17,
    21: 17,
    22: 17,
    23: 17,
    24: 34
  },
  numeros: { 1: 54, 36: 13 },
  deuteronomio: { 1: 46, 34: 12 },
  josue: { 1: 18, 24: 33 },
  juizes: { 1: 36, 21: 25 },
  rute: { 1: 22, 4: 22 },
  "1samuel": { 1: 28, 31: 13 },
  "2samuel": { 1: 27, 24: 25 },
  "1reis": { 1: 53, 22: 53 },
  "2reis": { 1: 18, 25: 30 },
  "1cronicas": { 1: 54, 29: 30 },
  "2cronicas": { 1: 17, 36: 23 },
  esdras: { 1: 11, 10: 44 },
  neemias: { 1: 11, 13: 31 },
  ester: { 1: 22, 10: 3 },
  jo: { 1: 22, 42: 17 },
  salmos: { 1: 6, 150: 6 },
  proverbios: { 1: 33, 31: 31 },
  eclesiastes: { 1: 18, 12: 14 },
  cantares: { 1: 17, 8: 14 },
  isaias: { 1: 31, 66: 24 },
  jeremias: { 1: 19, 52: 34 },
  lamentacoes: { 1: 22, 5: 22 },
  ezequiel: { 1: 28, 48: 35 },
  daniel: { 1: 21, 12: 13 },
  oseias: { 1: 11, 14: 9 },
  joel: { 1: 20, 3: 21 },
  amos: { 1: 15, 9: 15 },
  obadias: { 1: 21 },
  jonas: { 1: 17, 4: 11 },
  miqueias: { 1: 16, 7: 20 },
  naum: { 1: 15, 3: 19 },
  habacuque: { 1: 17, 3: 19 },
  sofonias: { 1: 18, 3: 20 },
  ageu: { 1: 15, 2: 23 },
  zacarias: { 1: 21, 14: 21 },
  malaquias: { 1: 14, 4: 6 },
  mateus: { 1: 25, 28: 20 },
  marcos: { 1: 45, 16: 20 },
  lucas: { 1: 80, 24: 53 },
  joao: { 1: 51, 21: 25 },
  atos: { 1: 26, 28: 31 },
  romanos: { 1: 32, 16: 27 },
  "1corintios": { 1: 31, 16: 24 },
  "2corintios": { 1: 24, 13: 14 },
  galatas: { 1: 24, 6: 18 },
  efesios: { 1: 23, 6: 24 },
  filipenses: { 1: 30, 4: 23 },
  colossenses: { 1: 29, 4: 18 },
  "1tessalonicenses": { 1: 10, 5: 28 },
  "2tessalonicenses": { 1: 12, 3: 18 },
  "1timoteo": { 1: 20, 6: 21 },
  "2timoteo": { 1: 18, 4: 22 },
  tito: { 1: 16, 3: 15 },
  filemom: { 1: 25 },
  hebreus: { 1: 14, 13: 25 },
  tiago: { 1: 27, 5: 20 },
  "1pedro": { 1: 25, 5: 14 },
  "2pedro": { 1: 21, 3: 18 },
  "1joao": { 1: 10, 5: 21 },
  "2joao": { 1: 13 },
  "3joao": { 1: 14 },
  judas: { 1: 25 },
  apocalipse: { 1: 20, 22: 21 }
};

// Função para obter o número de versículos para um livro e capítulo específicos
export const getNumeroVersiculos = (livro: string, capitulo: number): number => {
  if (versiculosPorCapitulo[livro] && versiculosPorCapitulo[livro][capitulo]) {
    return versiculosPorCapitulo[livro][capitulo];
  }
  
  const capitulosFinal = versiculosPorCapitulo[livro] || {};
  const ultimoCapitulo = Object.keys(capitulosFinal).map(Number).sort((a, b) => b - a)[0] || 0;
  
  if (capitulo <= ultimoCapitulo) {
    return 30;
  }
  
  return 0;
};

// Formata o nome do livro para exibição
const formatBookName = (bookId: string): string => {
  const bookMap: Record<string, string> = {
    "genesis": "Gênesis",
    "exodo": "Êxodo",
    "levitico": "Levítico",
    "numeros": "Números",
    "deuteronomio": "Deuteronômio",
    "josue": "Josué",
    "juizes": "Juízes",
    "rute": "Rute",
    "1samuel": "1 Samuel",
    "2samuel": "2 Samuel",
    "1reis": "1 Reis",
    "2reis": "2 Reis",
    "1cronicas": "1 Crônicas",
    "2cronicas": "2 Crônicas",
    "esdras": "Esdras",
    "neemias": "Neemias",
    "ester": "Ester",
    "jo": "Jó",
    "salmos": "Salmos",
    "proverbios": "Provérbios",
    "eclesiastes": "Eclesiastes",
    "cantares": "Cantares",
    "isaias": "Isaías",
    "jeremias": "Jeremias",
    "lamentacoes": "Lamentações",
    "ezequiel": "Ezequiel",
    "daniel": "Daniel",
    "oseias": "Oséias",
    "joel": "Joel",
    "amos": "Amós",
    "obadias": "Obadias",
    "jonas": "Jonas",
    "miqueias": "Miquéias",
    "naum": "Naum",
    "habacuque": "Habacuque",
    "sofonias": "Sofonias",
    "ageu": "Ageu",
    "zacarias": "Zacarias",
    "malaquias": "Malaquias",
    "mateus": "Mateus",
    "marcos": "Marcos",
    "lucas": "Lucas",
    "joao": "João",
    "atos": "Atos",
    "romanos": "Romanos",
    "1corintios": "1 Coríntios",
    "2corintios": "2 Coríntios",
    "galatas": "Gálatas",
    "efesios": "Efésios",
    "filipenses": "Filipenses",
    "colossenses": "Colossenses",
    "1tessalonicenses": "1 Tessalonicenses",
    "2tessalonicenses": "2 Tessalonicenses",
    "1timoteo": "1 Timóteo",
    "2timoteo": "2 Timóteo",
    "tito": "Tito",
    "filemom": "Filemom",
    "hebreus": "Hebreus",
    "tiago": "Tiago",
    "1pedro": "1 Pedro",
    "2pedro": "2 Pedro",
    "1joao": "1 João",
    "2joao": "2 João",
    "3joao": "3 João",
    "judas": "Judas",
    "apocalipse": "Apocalipse"
  };
  
  return bookMap[bookId] || bookId.charAt(0).toUpperCase() + bookId.slice(1);
};

// Retorna o nome completo da versão baseado no ID
const getNomeVersao = (id: string): string => {
  const versoes: Record<string, string> = {
    "nvi": "Nova Versão Internacional",
    "acf": "Almeida Corrigida Fiel",
    "ara": "Almeida Revista e Atualizada",
    "naa": "Nova Almeida Atualizada",
    "ntlh": "Nova Tradução na Linguagem de Hoje",
    "kjv": "King James Version",
    "aa": "Almeida Atualizada",
    "arc": "Almeida Revisada e Corrigida",
    "ra": "Almeida Revista e Atualizada"
  };
  return versoes[id] || id.toUpperCase();
};

/**
 * Gera um versículo simulado com base no livro, capítulo e versículo
 * Esta função produz conteúdo consistente baseado nos parâmetros, garantindo
 * que o mesmo versículo sempre produza o mesmo texto
 */
const generateSimulatedVerse = (
  bookId: string, 
  chapter: number, 
  verse: number, 
  version: string
): string => {
  // Mapear versões para estilos de linguagem diferentes
  const versionStyles: Record<string, string> = {
    "nvi": "um estilo contemporâneo e de fácil compreensão",
    "acf": "um estilo clássico e formal, seguindo a tradição textual",
    "ara": "um estilo equilibrado entre formal e contemporâneo",
    "naa": "um estilo acessível com terminologia atualizada",
    "ntlh": "um estilo simples e direto, voltado para fácil compreensão",
    "kjv": "o estilo literário formal do inglês clássico",
    "aa": "um estilo direto e fiel aos originais",
    "arc": "um estilo tradicional com linguagem portuguesa clássica",
    "ra": "um português formal seguindo as tradições da Almeida"
  };
  
  const versionStyle = versionStyles[version] || "estilo próprio";
  const bookName = formatBookName(bookId);
  
  // Criar um identificador único para este versículo específico
  const verseId = `${bookId}-${chapter}-${verse}`;
  
  // Usar esse identificador para criar uma "aleatoriedade" determinística
  const charSum = verseId.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  
  // Lista de frases introdutórias que podem começar um versículo
  const intros = [
    "Então disse Deus,",
    "E aconteceu que",
    "Naquele tempo,",
    "Assim diz o Senhor,",
    "Por isso,",
    "Bem-aventurado é aquele que",
    "O Senhor declarou,",
    "Portanto,",
    "Eis que",
    "E Jesus disse,"
  ];
  
  // Selecionar uma introdução baseada no ID do versículo (determinístico)
  const selectedIntro = intros[charSum % intros.length];
  
  // Criar o texto do versículo com comprimento baseado no número do versículo
  // Versículos com números maiores tendem a ser mais longos
  const length = 20 + (verse % 5) * 15;
  
  // Texto simulado para o versículo baseado no ID e versão
  return `[${getNomeVersao(version)}] ${selectedIntro} este é o texto simulado para ${bookName} ${chapter}:${verse} em ${versionStyle}. Este versículo foi gerado automaticamente para representar o conteúdo que estaria presente na versão original.`;
};

const BibleVerse: React.FC<BibleVerseProps> = ({ livro, capitulo, versiculo, versao = "nvi" }) => {
  const [textoVersiculo, setTextoVersiculo] = useState<string>("");
  const [erro, setErro] = useState<string | null>(null);
  const [avisoSimulado, setAvisoSimulado] = useState<boolean>(false);
  
  useEffect(() => {
    if (versiculo) {
      getVerseText();
    } else {
      setTextoVersiculo("");
      setErro(null);
      setAvisoSimulado(false);
    }
  }, [livro, capitulo, versiculo, versao]);

  const getVerseText = () => {
    try {
      setErro(null);
      setAvisoSimulado(false);
      
      // Verificar se a versão existe em nossos dados
      if (!versiculosExemploPorVersao[versao]) {
        // Versão não encontrada, vamos gerar um versículo simulado
        const simulatedVerse = generateSimulatedVerse(livro, capitulo, versiculo!, versao);
        setTextoVersiculo(simulatedVerse);
        setAvisoSimulado(true);
        return;
      }
      
      // Tentamos obter o versículo da versão solicitada
      const verse = getVerseFromVersion(versao);
      
      if (verse) {
        // Versículo encontrado na versão solicitada
        setTextoVersiculo(verse);
      } else {
        // Versículo não encontrado na versão solicitada, tentamos na NVI
        const nviVerse = getVerseFromVersion("nvi");
        
        if (nviVerse) {
          // Versículo encontrado na NVI, usamos como fallback
          setTextoVersiculo(nviVerse);
          setErro(`Versículo não disponível na versão "${getNomeVersao(versao)}". Exibindo texto da NVI.`);
        } else {
          // Versículo não encontrado em nenhuma versão, geramos conteúdo simulado
          const simulatedVerse = generateSimulatedVerse(livro, capitulo, versiculo!, versao);
          setTextoVersiculo(simulatedVerse);
          setAvisoSimulado(true);
        }
      }
    } catch (error) {
      console.error("Erro ao buscar versículo:", error);
      
      // Em caso de erro, sempre geramos um versículo simulado
      const simulatedVerse = generateSimulatedVerse(livro, capitulo, versiculo!, versao);
      setTextoVersiculo(simulatedVerse);
      setAvisoSimulado(true);
    }
  };
  
  const getVerseFromVersion = (versionId: string): string | null => {
    if (!versiculosExemploPorVersao[versionId]) {
      return null;
    }
    
    if (!versiculosExemploPorVersao[versionId][livro]) {
      return null;
    }
    
    if (!versiculosExemploPorVersao[versionId][livro][capitulo]) {
      return null;
    }
    
    if (!versiculo || !versiculosExemploPorVersao[versionId][livro][capitulo][versiculo]) {
      return null;
    }
    
    return versiculosExemploPorVersao[versionId][livro][capitulo][versiculo];
  };

  return (
    <div className="mt-8 text-center">
      {versiculo ? (
        <div className="p-6 bg-black/60 rounded-lg border border-gray-800">
          <h3 className="text-xl font-bold mb-4 text-indigo-300">
            {formatBookName(livro)} {capitulo}:{versiculo} <span className="text-sm">({getNomeVersao(versao)})</span>
          </h3>
          
          {erro && (
            <div className="mb-4 py-2 px-4 bg-yellow-900/50 border border-yellow-700 rounded text-yellow-300 text-sm">
              {erro}
            </div>
          )}
          
          {avisoSimulado && (
            <div className="mb-4 py-2 px-4 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm">
              Este é um texto simulado. A versão completa deste versículo não está disponível no momento.
            </div>
          )}
          
          {textoVersiculo ? (
            <p className="text-xl text-gray-300 mb-4">
              {textoVersiculo}
            </p>
          ) : (
            <p className="text-gray-400 italic">
              Versículo não encontrado. Por favor, tente outro versículo ou versão.
            </p>
          )}
        </div>
      ) : (
        <p className="text-gray-400 italic">Selecione um versículo para visualizar o texto.</p>
      )}
    </div>
  );
};

export default BibleVerse;
