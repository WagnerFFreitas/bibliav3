
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
        5: "Deus chamou à luz dia, e às trevas chamou noite. Passaram-se a tarde e a manhã; esse foi o primeiro dia.",
        6: "Disse Deus: 'Haja um firmamento no meio das águas, e separe ele as águas das águas.'",
        7: "Deus fez o firmamento e separou as águas que estavam embaixo do firmamento das que estavam por cima. E assim aconteceu.",
        8: "Ao firmamento Deus chamou céu. Passaram-se a tarde e a manhã; esse foi o segundo dia.",
        9: "E disse Deus: 'Ajuntem-se as águas que estão debaixo do céu num só lugar, e apareça a parte seca.' E assim aconteceu.",
        10: "À parte seca Deus chamou terra, e chamou mares ao conjunto das águas. E Deus viu que ficou bom.",
        11: "Então disse Deus: 'Cubra-se a terra de vegetação: plantas que dêem sementes e árvores cujos frutos produzam sementes de acordo com as suas espécies.' E assim aconteceu.",
        12: "A terra fez brotar a vegetação: plantas que dêem sementes de acordo com as suas espécies, e árvores cujos frutos produzem sementes de acordo com as suas espécies. E Deus viu que ficou bom.",
        13: "Passaram-se a tarde e a manhã; esse foi o terceiro dia."
      },
      2: {
        1: "Assim foram terminados os céus e a terra, e tudo o que neles há.",
        2: "No sétimo dia Deus já havia concluído a obra que realizara, e nesse dia descansou.",
        3: "Abençoou Deus o sétimo dia e o santificou, porque nele descansou de toda a obra que realizara na criação."
      }
    },
    exodo: {
      1: {
        1: "São estes os nomes dos filhos de Israel que entraram com Jacó no Egito, cada um com sua família:",
        2: "Rúben, Simeão, Levi e Judá;",
        3: "Issacar, Zebulom e Benjamim;",
        4: "Dã e Naftali; Gade e Aser.",
        5: "Os descendentes de Jacó eram setenta ao todo; José, porém, já estava no Egito."
      },
      2: {
        1: "Um homem da tribo de Levi casou-se com uma mulher da mesma tribo,",
        2: "e ela engravidou e deu à luz um filho. Vendo que ele era bonito, ela o escondeu por três meses."
      }
    }
  },
  acf: {
    genesis: {
      1: {
        1: "No princípio criou Deus os céus e a terra.",
        2: "E a terra era sem forma e vazia; e havia trevas sobre a face do abismo; e o Espírito de Deus se movia sobre a face das águas.",
        3: "E disse Deus: 'Haja luz', e houve luz.",
        4: "E viu Deus que era boa a luz; e fez Deus separação entre a luz e as trevas.",
        5: "E Deus chamou à luz Dia, e às trevas chamou Noite. E foi a tarde e a manhã, o dia primeiro.",
        6: "E disse Deus: 'Haja uma expansão no meio das águas, e haja separação entre águas e águas.'",
        7: "E fez Deus a expansão, e fez separação entre as águas que estavam debaixo da expansão e as águas que estavam sobre a expansão; e assim foi.",
        8: "E chamou Deus à expansão Céus, e foi a tarde e a manhã, o dia segundo.",
        9: "E disse Deus: 'Ajuntem-se as águas debaixo dos céus num só lugar, e apareça a porção seca; e assim foi.",
        10: "E chamou Deus à porção seca Terra; e ao ajuntamento das águas chamou Mares; e viu Deus que isso era bom.",
        11: "E disse Deus: 'Produza a terra erva verde, erva que dê semente, árvore frutífera que dê fruto segundo a sua espécie, cuja semente está nela sobre a terra; e assim foi.",
        12: "A terra produziu erva, erva dando semente conforme a sua espécie, e a árvore frutífera, cuja semente está nela conforme a sua espécie; e viu Deus que era bom.",
        13: "Passaram-se a tarde e a manhã; esse foi o terceiro dia."
      },
      2: {
        1: "Assim os céus, a terra e todo o seu exército foram acabados.",
        2: "E, havendo Deus acabado no dia sétimo a obra que fizera, descansou no sétimo dia de toda a obra que tinha feito.",
        3: "E abençoou Deus o dia sétimo e o santificou; porque nele descansou de toda a obra que realizara na criação."
      }
    },
    exodo: {
      1: {
        1: "Estes, pois, são os nomes dos filhos de Israel, que entraram no Egito com Jacó; cada um entrou com sua casa:",
        2: "Rúben, Simeão, Levi, e Judá;",
        3: "Issacar, Zebulom, e Benjamim;",
        4: "Dã e Naftali, Gade e Aser.",
        5: "Todas as almas, pois, que procederam dos lombos de Jacó, foram setenta almas; José, porém, estava no Egito."
      },
      2: {
        1: "E foi-se um homem da casa de Levi e casou com uma filha de Levi.",
        2: "E a mulher concebeu e deu à luz um filho; e, vendo que ele era formoso, escondeu-o três meses."
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
        6: "E disse Deus: 'Haja firmamento no meio das águas, e haja separação entre águas e águas.'",
        7: "Fez, pois, Deus o firmamento e separação entre as águas debaixo do firmamento e as águas sobre o firmamento. E assim se fez.",
        8: "E chamou Deus ao firmamento Céus. Houve tarde e manhã, o segundo dia.",
        9: "Disse também Deus: Ajuntem-se as águas debaixo dos céus num só lugar, e apareça a porção seca; e assim se fez.",
        10: "À porção seca chamou Deus Terra; e ao ajuntamento das águas, Mares. E viu Deus que isso era bom.",
        11: "E disse: Produza a terra relva, ervas que dêem semente e árvores frutíferas que dêem fruto segundo a sua espécie, cuja semente esteja nele, sobre a terra. E assim se fez.",
        12: "A terra produziu relva, ervas que davam semente segundo a sua espécie e árvores que davam fruto, cuja semente estava nele, conforme a sua espécie. E viu Deus que isso era bom.",
        13: "Houve tarde e manhã, o terceiro dia."
      },
      2: {
        1: "Assim, pois, foram acabados os céus e a terra e todo o seu exército.",
        2: "E, havendo Deus terminado no dia sétimo a sua obra, que fizera, descansou nesse dia de toda a sua obra que tinha feito.",
        3: "E abençoou Deus o dia sétimo e o santificou; porque nele descansou de toda a obra que, como Criador, fizera."
      }
    },
    exodo: {
      1: {
        1: "São estes os nomes dos filhos de Israel que entraram no Egito com Jacó; cada um entrou com sua família:",
        2: "Rúben, Simeão, Levi e Judá,",
        3: "Issacar, Zebulom, Benjamim,",
        4: "Dã e Naftali, Gade e Aser.",
        5: "Toda descendência de Jacó foi de setenta pessoas; José, porém, já estava no Egito."
      },
      2: {
        1: "Um homem da casa de Levi casou-se com uma filha de Levi.",
        2: "A mulher concebeu e deu à luz um filho; vendo que era formoso, escondeu-o por três meses."
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
        6: "Disse Deus: 'Haja um firmamento no meio das águas, e haja separação entre águas e águas.'",
        7: "Deus fez o firmamento e separou as águas que estavam debaixo do firmamento das águas que estavam por cima do firmamento. E assim foi.",
        8: "Ao firmamento, Deus chamou 'céu'. Houve tarde e manhã: o segundo dia.",
        9: "Disse Deus: 'Ajuntem-se as águas debaixo dos céus num só lugar, e apareça a porção seca; e assim foi.",
        10: "Deus chamou ao elemento seco 'terra' e ao ajuntamento das águas, 'mares'. E Deus viu que isso era bom.",
        11: "Disse Deus: 'Produza a terra relva, ervas que deem semente e árvores frutíferas que, segundo as suas espécies, deem fruto que tenha em si a sua semente, sobre a terra.' E assim foi.",
        12: "A terra produziu relva, ervas que davam semente segundo as suas espécies e árvores que davam fruto que tinha em si a sua semente, segundo as suas espécies. E Deus viu que isso era bom.",
        13: "Houve tarde e manhã: o terceiro dia."
      },
      2: {
        1: "Assim, pois, foram acabados os céus e a terra e todo o seu exército.",
        2: "No sétimo dia, Deus já havia acabado a obra que fizera, e descansou nesse dia de toda a obra que tinha feito.",
        3: "Deus abençoou o sétimo dia e o santificou, porque nele descansou de toda a obra que realizara na criação."
      }
    },
    exodo: {
      1: {
        1: "São estes os nomes dos filhos de Israel que entraram no Egito com Jacó, cada um com a sua família:",
        2: "Rúben, Simeão, Levi e Judá,",
        3: "Issacar, Zebulom, Benjamim,",
        4: "Dã, Naftali, Gade e Aser.",
        5: "Todos os descendentes de Jacó foram setenta pessoas. José já estava no Egito."
      },
      2: {
        1: "Um homem da família de Levi casou-se com uma mulher da tribo de Levi.",
        2: "Ela engravidou e deu à luz um filho. E, vendo que era bonito, escondeu-o por três meses."
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
        6: "Então Deus disse: 'Que haja uma cobertura entre as águas para separar umas das outras!'",
        7: "E assim Deus fez a cobertura que separou as águas que estavam debaixo da cobertura das que estavam em cima. E assim aconteceu.",
        8: "Deus chamou a cobertura de 'céu'. A noite passou, e a manhã chegou. Esse foi o segundo dia.",
        9: "Então Deus disse: 'Que as águas que estão debaixo do céu se juntem num só lugar, e apareça a terra seca!' E assim aconteceu.",
        10: "Deus chamou a terra seca de 'terra' e as águas que se juntaram de 'mar'. E Deus viu que o que havia feito era bom.",
        11: "Então disse: 'Que a terra produza todo tipo de vegetais, isto é, plantas que deem semente e árvores que deem frutas com sementes!' E assim aconteceu.",
        12: "A terra produziu vegetais: plantas que dão semente e árvores que dão frutas com sementes. E Deus viu que o que havia feito era bom.",
        13: "A noite passou, e a manhã chegou. Esse foi o terceiro dia."
      },
      2: {
        1: "Foi assim que Deus acabou de criar o céu e a terra e tudo o que há neles.",
        2: "No sétimo dia Deus já havia acabado a sua obra e nesse dia ele descansou de todo o seu trabalho.",
        3: "Deus abençoou o sétimo dia e o santificou, porque nesse dia ele descansou de todo o trabalho da criação."
      }
    },
    exodo: {
      1: {
        1: "Jacó foi para o Egito, levando os seus filhos, e cada um deles foi com a sua família. Eis os seus nomes:",
        2: "Rúben, Simeão, Levi, Judá,",
        3: "Issacar, Zebulom, Benjamim,",
        4: "Dã, Naftali, Gade e Aser.",
        5: "Ao todo eram setenta pessoas descendentes de Jacó. José já estava no Egito."
      },
      2: {
        1: "Um homem da tribo de Levi casou com uma moça da mesma tribo,",
        2: "e eles tiveram um filho. Como o menino era bonito, a mãe o escondeu durante três meses."
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
        5: "And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day."
      },
      2: {
        1: "Thus the heavens and the earth were finished, and all the host of them.",
        2: "And on the seventh day God ended his work which he had made; and he rested on the seventh day from all his work which he had made.",
        3: "And God blessed the seventh day, and sanctified it: because that in it he had rested from all his work which God created and made."
      }
    },
    exodo: {
      1: {
        1: "Now these are the names of the children of Israel, which came into Egypt; every man and his household came with Jacob.",
        2: "Reuben, Simeon, Levi, and Judah,",
        3: "Issachar, Zebulun, and Benjamin,",
        4: "Dan, and Naphtali, Gad, and Asher.",
        5: "And all the souls that came out of the loins of Jacob were seventy souls: for Joseph was in Egypt already."
      },
      2: {
        1: "And there went a man of the house of Levi, and took to wife a daughter of Levi.",
        2: "And the woman conceived, and bare a son: and when she saw him that he was a goodly child, she hid him three months."
      }
    }
  },
  aa: {
    genesis: {
      1: {
        1: "No princípio criou Deus os céus e a terra.",
        2: "A terra, porém, estava vazia e em desordem, e havia trevas sobre a face do abismo; e o Espírito de Deus pairava sobre a face das águas.",
        3: "Disse Deus: Haja luz. E houve luz.",
        4: "Viu Deus que a luz era boa; e fez separação entre a luz e as trevas.",
        5: "E Deus chamou à luz Dia, e às trevas Noite. E foi a tarde e a manhã, o primeiro dia."
      }
    }
  },
  arc: {
    genesis: {
      1: {
        1: "No princípio criou Deus os céus e a terra.",
        2: "E a terra era sem forma e vazia; e havia trevas sobre a face do abismo; e o Espírito de Deus se movia sobre a face das águas.",
        3: "E disse Deus: Haja luz; e houve luz.",
        4: "E viu Deus que era boa a luz; e fez Deus separação entre a luz e as trevas.",
        5: "E Deus chamou à luz Dia; e às trevas chamou Noite. E foi a tarde e a manhã, o dia primeiro."
      }
    }
  },
  ra: {
    genesis: {
      1: {
        1: "No princípio criou Deus os céus e a terra.",
        2: "A terra, porém, estava sem forma e vazia; havia trevas sobre a face do abismo, e o Espírito de Deus pairava por sobre as águas.",
        3: "Disse Deus: Haja luz; e houve luz.",
        4: "E viu Deus que a luz era boa; e fez separação entre a luz e as trevas.",
        5: "Chamou Deus à luz Dia e às trevas, Noite. Houve tarde e manhã, o primeiro dia."
      }
    }
  },
  original: {
    genesis: {
      1: {
        1: "בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ׃",
        2: "וְהָאָרֶץ הָיְתָה תֹהוּ וָבֹהוּ וְחֹשֶׁךְ עַל־פְּנֵי תְהוֹם וְרוּחַ אֱלֹהִים מְרַחֶפֶת עַל־פְּנֵי הַמָּיִם׃",
        3: "וַיֹּאמֶר אֱלֹהִים יְהִי אוֹר וַיְהִי־אוֹר׃",
        4: "וַיַּרְא אֱלֹהִים אֶת־הָאוֹר כִּי־טוֹב וַיַּבְדֵּל אֱלֹהִים בֵּין הָאוֹר וּבֵין הַחֹשֶׁךְ׃",
        5: "וַיִּקְרָא אֱלֹהִים לָאוֹר יוֹם וְלַחֹשֶׁךְ קָרָא לָיְלָה וַיְהִי־עֶרֶב וַיְהִי־בֹקֶר יוֹם אֶחָד׃"
      }
    },
    exodo: {
      1: {
        1: "וְאֵלֶּה שְׁמוֹת בְּנֵי יִשְׂרָאֵל הַבָּאִים מִצְרָיְמָה אִישׁ וּבֵיתוֹ בָּאוּ׃",
        2: "רְאוּבֵן שִׁמְעוֹן לֵוִי וִיהוּדָה׃",
        3: "יִשָּׂשכָר זְבוּלֻן וּבִנְיָמִן׃",
        4: "דָּן וְנַפְתָּלִי גָּד וְאָשֵׁר׃",
        5: "וַיְהִי כָּל־נֶפֶשׁ יֹצְאֵי יֶרֶךְ־יַעֲקֹב שִׁבְעִים נָפֶשׁ וְיוֹסֵף הָיָה בְמִצְרָיִם׃"
      }
    }
  }
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
  juizes: { 
    1: 36,
    2: 23,  // Correct number of verses in Judges 2
    3: 31,
    4: 24,
    5: 31,
    6: 40,
    7: 25,
    8: 35,
    9: 57,
    10: 18,
    11: 40,
    12: 15,
    13: 25,
    14: 20,
    15: 20,
    16: 31,
    17: 13,
    18: 31,
    19: 30,
    20: 48,
    21: 25
  },
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

// Verifica se um versículo existe para um determinado livro e capítulo
const versiculoExiste = (livro: string, capitulo: number, versiculo: number): boolean => {
  const totalVersiculos = getNumeroVersiculos(livro, capitulo);
  return versiculo > 0 && versiculo <= totalVersiculos;
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
  
  return bookMap[bookId] || bookId;
};

// Create BibleVerse component
const BibleVerse = ({ livro, capitulo, versiculo, versao = "nvi" }: BibleVerseProps) => {
  const [texto, setTexto] = useState<string | null>(null);
  const [titulo, setTitulo] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  
  useEffect(() => {
    if (!versiculo) {
      setTexto(null);
      setTitulo(null);
      setErro(null);
      return;
    }
    
    if (!versiculoExiste(livro, capitulo, versiculo)) {
      setErro(`O versículo ${versiculo} não existe em ${formatBookName(livro)} ${capitulo}.`);
      setTexto(null);
      setTitulo(null);
      return;
    }
    
    // Tentar carregar dados do arquivo JSON primeiro
    const carregarDadosJSON = async () => {
      try {
        const nomeArquivo = livro.toLowerCase()
          .replace(/\s+/g, '')
          .replace('ê', 'e')
          .replace('ç', 'c');
        
        const caminhoArquivo = `/src/data/${versao}/${nomeArquivo}/${capitulo}.json`;
        const response = await fetch(caminhoArquivo);
        
        if (response.ok) {
          const dados = await response.json();
          const versiculoData = dados.versículos[versiculo.toString()];
          
          if (versiculoData) {
            if (typeof versiculoData === 'object') {
              setTexto(versiculoData.texto);
              setTitulo(versiculoData.título || null);
            } else {
              setTexto(versiculoData);
              setTitulo(null);
            }
            setErro(null);
            return;
          }
        }
      } catch (error) {
        console.log('Erro ao carregar dados JSON, usando fallback');
      }
      
      // Fallback para dados estáticos
      const versiculoTexto = versiculosExemploPorVersao[versao]?.[livro]?.[capitulo]?.[versiculo];
      
      if (versiculoTexto) {
        setTexto(versiculoTexto);
        setTitulo(null);
        setErro(null);
      } else {
        // Tentar encontrar o versículo em outra versão se não estiver disponível na versão solicitada
        const versaoPadrao = "nvi";
        const versiculoDefault = versiculosExemploPorVersao[versaoPadrao]?.[livro]?.[capitulo]?.[versiculo];
        
        if (versiculoDefault) {
          setTexto(versiculoDefault);
          setTitulo(null);
          setErro(`Versículo não disponível na versão ${versao.toUpperCase()}. Exibindo da versão ${versaoPadrao.toUpperCase()}.`);
        } else {
          setTexto("Este é um texto simulado. A versão completa deste versículo não está disponível no momento.");
          setTitulo(null);
          setErro(`Versículo não disponível em ${formatBookName(livro)} ${capitulo}:${versiculo}.`);
        }
      }
    };

    carregarDadosJSON();
  }, [livro, capitulo, versiculo, versao]);
  
  if (!versiculo) return null;
  
  return (
    <div className="my-8 p-6 bg-black/70 rounded-lg text-white border border-indigo-900">
      <h3 className="text-xl font-bold mb-2 text-indigo-300">
        {formatBookName(livro)} {capitulo}:{versiculo}
      </h3>
      
      {titulo && (
        <h4 className="text-lg font-bold text-green-500 mb-4 text-center uppercase tracking-wide">
          {titulo}
        </h4>
      )}
      
      {erro && (
        <div className="mb-4 text-amber-400 text-sm">
          {erro}
        </div>
      )}
      
      <div className="text-lg leading-relaxed">
        {texto}
      </div>
      
      <div className="mt-4 text-right text-sm text-gray-400">
        Versão: {versao.toUpperCase()}
      </div>
    </div>
  );
};

export default BibleVerse;
