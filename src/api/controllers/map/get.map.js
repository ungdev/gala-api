module.exports = app => {
  app.get('/map', async (req, res) => {
    return res
      .status(200)
      .json({
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [
                [[0, 0], [1000, 0], [1000, 1000], [0, 1000], [0, 0]]
              ]
            },
            properties: {
              name: 'Plan Interactif',
              description:
                "Cliquez sur une zone du Gala pour avoir plus d'information sur celle-ci",
              quote: "Trouver n'est rien, c'est le plan qui est difficile.",
              author: 'Fedor Dostoïevski'
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [380.435546875, 610.134765625],
                  [434.685546875, 604.134765625],
                  [430.935546875, 574.134765625],
                  [377.185546875, 580.384765625]
                ]
              ]
            },
            properties: {
              name: 'Stand prévention ANPAA',
              description: "Plus d'informations à l'approche du Gala",
              quote: 'Demain il sera 24h trop tard.',
              author: 'Timothée Toury'
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [
                [[524, 432.5], [542.5, 456], [577, 430], [559, 405.5]]
              ]
            },
            properties: {
              name: "Poste de Secourisme de Sec'UTT",
              description:
                'Si tu finis en pls, tu te réveilleras sûrement là bas :) ',
              quote:
                "C'est deux fois secourir un malheureux que de le secourir promptement.",
              author: 'Publius Syrus'
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [633.478515625, 636.55078125],
                  [670.478515625, 633.05078125],
                  [656.599609375, 574.599609375],
                  [634.474609375, 577.474609375]
                ]
              ]
            },
            properties: {
              name: 'Vestiaire et espace repos SAM',
              description:
                "Vous pouvez déposer ici vos affaires gratuitement. Ne perdez pas votre ticket ! (La technique c'est de le prendre en photo ;) )",
              quote: "La pudeur est née avec l'invention du vêtement.",
              author: 'Mark Twain'
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [342.67578125, 589.05859375],
                  [301.67578125, 536.05859375],
                  [342.17578125, 504.55859375],
                  [383.17578125, 561.55859375]
                ]
              ]
            },
            properties: {
              name: "[1er] M104 : EAT Le Cabaret des Fal'Innov'UTT",
              description:
                "Tous pensaient cela impossible, mais pourtant les voilà ! Innov'UTT et fal'UTT réunis pour ce gala, pour vous !",
              selling: ['Cocktail Cacibel', 'Chouffe', 'Faro'],

              activity: 'Jeux de cartes'
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [694.75, 530.279296875],
                  [690.25, 528.279296875],
                  [687.75, 525.279296875],
                  [685.75, 521.779296875],
                  [685.75, 496.279296875],
                  [688.25, 492.279296875],
                  [692.25, 489.279296875],
                  [728.75, 487.779296875],
                  [732.75, 490.279296875],
                  [736.25, 494.779296875],
                  [737.75, 521.779296875],
                  [735.25, 526.279296875],
                  [730.75, 529.779296875]
                ]
              ]
            },
            properties: {
              name: 'Taureau mécanique',
              description: "C'est partit pour le rodéo !",
              quote: 'Demain il sera 24h trop tard.',
              author: 'Timothée Toury'
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [615.75, 406.75],
                  [605.75, 394.75],
                  [603.25, 387.5],
                  [603, 379],
                  [603, 369.25],
                  [608, 361.75],
                  [615, 354.75],
                  [619.25, 351.75],
                  [625, 349.25],
                  [632.25, 347.25],
                  [640.75, 347.75],
                  [652.25, 352.5],
                  [662, 363.25],
                  [666.25, 370.5]
                ]
              ]
            },
            properties: {
              name: 'Bar à softs (gratuits) et Karaoké',
              description:
                'Tu as soif ? Viens boire des softs gratuits dans ce bar ! En plus il y aura un Karaoké',
              quote:
                'On ne peut pas faire la différence en faisant comme tout le monde.',
              author: 'P. T. Barnum'
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [413.25, 632.75],
                  [424.1875, 636.5],
                  [432.375, 638.8125],
                  [441.25, 640.8125],
                  [455.1875, 644.125],
                  [465.5, 645.875],
                  [466.125, 646.25],
                  [472.875, 647.5],
                  [482.6875, 598.28125],
                  [477.125, 597.28125],
                  [472.125, 596.21875],
                  [466.96875, 595.21875],
                  [459.5625, 593.375],
                  [449.875, 591.0625],
                  [438.75, 588.125],
                  [428.25, 584.9375]
                ]
              ]
            },
            properties: {
              name: '[RDC] Bar Revivre (sans alcool)',
              description:
                "Espace SAM tenu par l'association Revivre où des permanenciers sont là pour distribuer de l'eau, des softs. Ils ont des éthylotests à disposition.",
              quote: "L'homme ne meurt que pour revivre.",
              author: 'Roch Carrier'
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [476.25, 408.81396484375],
                  [478.125, 409.43896484375],
                  [480.5, 409.43896484375],
                  [485, 409.18896484375],
                  [490.875, 408.68896484375],
                  [501.75, 407.18896484375],
                  [525.625, 402.68896484375],
                  [528, 401.68896484375],
                  [530.375, 400.81396484375],
                  [530.375, 399.31396484375],
                  [530.25, 395.93896484375],
                  [529.75, 389.68896484375],
                  [528.740234375, 382.15966796875],
                  [524.68017578125, 358.77197265625],
                  [525.5, 357.375],
                  [522.5, 339.25],
                  [520.75, 338.25],
                  [468.25, 346.125],
                  [466.75, 348],
                  [469.25, 365.875],
                  [470.5, 367],
                  [475.2939453125, 407.1728515625]
                ]
              ]
            },
            properties: {
              name: 'Caesar Palace (scène principale)',
              description:
                'Scène principale où se produieront les plus grands artistes du Gala.',
              quote:
                "Les danses modernes ? Ce n'est plus de la danse, c'est de la décadence.",
              author: 'Alfred Capus'
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [
                [[681, 459], [758.5, 458.5], [757.5, 416.5], [680.5, 418]]
              ]
            },
            properties: {
              name: 'Bar Elvis Stage',
              description:
                "Entrez dans l'atmosphère greco-romaine de notre bar, nous allons vous plonger dans l'ambiance d'un des hôtels les plus connus au monde : Le Caesar Palace ! Les fontaines de bières vous rappelleront les thermes romains avec la douce Blanche de Namur pour vous désaltérer. Rendez hommage à Bachus en profitant de la musique enivrante et laissez celle-ci être la muse de votre soirée !",
              selling: [
                'Cocktail Viridi Malum',
                'Chouffe',
                'Deli Red',
                'Terrano Blanche'
              ],
              activity: 'Medium - Osselets Romains'
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [678.6611328125, 589.0078125],
                  [691.4111328125, 586.7578125],
                  [702.9111328125, 584.2578125],
                  [714.4111328125, 580.7578125],
                  [723.4111328125, 577.5078125],
                  [737.1611328125, 571.2578125],
                  [748.4111328125, 565.5078125],
                  [757.1611328125, 560.0078125],
                  [761.6611328125, 557.2578125],
                  [746.6611328125, 532.0078125],
                  [732.9111328125, 540.0078125],
                  [723.6611328125, 544.5078125],
                  [716.4111328125, 548.0078125],
                  [710.1611328125, 550.7578125],
                  [702.4111328125, 554.0078125],
                  [694.4111328125, 555.7578125],
                  [685.1611328125, 557.7578125],
                  [677.6611328125, 560.5078125],
                  [671.9111328125, 562.0078125]
                ]
              ]
            },
            properties: {
              name: 'C104 : EAT RUTT VEGAS / C102 : EAT Very Bad PMOM',
              description:
                "Le rugby, c'est l'histoire d'un ballon avec des copains autour et quand il n'y a plus de ballon, il reste les copains. Tu aimes la fête et les copains, tu sais où nous trouver ! / Pour passer un Gala extraordinaire, venez nous rejoindre au sein de notre EAT pour vous retrouver dans l'ambiance de Very Bad Trip avec bien sur la convivialité et la bonne ambiance reconnu mondialement des PMOMs.",

              selling: [
                'Suze Cocktail',
                'Chouffe',
                'Faro',
                'Saint-Martin Ambrée',
                '/',
                'Buzz Fick',
                'Deli Red',
                'Terrano Blanche'
              ],
              activity: 'Roulette Folle'
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [544.5, 367.5],
                  [589.75, 369.25],
                  [591.25, 342.5],
                  [545.75, 340.25]
                ]
              ]
            },
            properties: {
              name: 'Foodtruck burger',
              description: "Plus d'informations prochainement"
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [
                [[569, 596], [618.5, 597.5], [617.5, 570.5], [572, 569]]
              ]
            },
            properties: {
              name: 'Salle de jeux casino',
              description: "Plus d'informations prochainement"
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [582.6171875, 562.533203125],
                  [665.25, 502.25],
                  [649, 480],
                  [565.5, 541.25]
                ]
              ]
            },
            properties: {
              name:
                "Foodtrucks : crêpe d'ELOOP, Hot Dogs de Franck et Lahmacun",
              description: "Plus d'informations prochainement"
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [373.75, 485.5],
                  [399.75, 475.25],
                  [382.5, 434.25],
                  [357.25, 444.5]
                ]
              ]
            },
            properties: {
              name: 'Foodtruck Healthy',
              description: "Plus d'informations prochainement"
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [320.236328125, 491.2734375],
                  [318.236328125, 491.2734375],
                  [315.236328125, 491.2734375],
                  [311.736328125, 489.7734375],
                  [307.736328125, 486.2734375],
                  [304.736328125, 483.2734375],
                  [303.736328125, 481.7734375],
                  [301.736328125, 478.2734375],
                  [301.736328125, 474.2734375],
                  [300.736328125, 471.7734375],
                  [300.736328125, 469.2734375],
                  [301.236328125, 466.7734375],
                  [302.736328125, 463.7734375],
                  [304.236328125, 461.7734375],
                  [307.236328125, 458.7734375],
                  [309.736328125, 456.2734375],
                  [311.736328125, 454.7734375],
                  [315.236328125, 454.7734375],
                  [318.736328125, 453.2734375],
                  [322.236328125, 453.2734375],
                  [326.736328125, 453.7734375],
                  [330.236328125, 456.2734375],
                  [332.736328125, 458.7734375],
                  [334.736328125, 460.2734375],
                  [337.236328125, 463.2734375],
                  [338.736328125, 468.7734375],
                  [339.236328125, 473.2734375],
                  [339.236328125, 478.2734375],
                  [336.236328125, 482.7734375],
                  [333.736328125, 485.2734375],
                  [330.736328125, 488.2734375],
                  [327.736328125, 489.7734375],
                  [324.736328125, 490.2734375],
                  [321.736328125, 491.7734375]
                ]
              ]
            },
            properties: {
              name: 'Point de Rechargement M',
              description:
                'Vous retrouverez ici un point de rechargement pour recharger votre compte cashless.',
              quote: "L'influence est une nourriture.",
              author: 'Pierre Baillargeon'
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [607.5, 457.5],
                  [603, 457.5],
                  [600, 456.25],
                  [596.75, 454.5],
                  [593, 451.5],
                  [591, 449.75],
                  [589.75, 446],
                  [588.25, 442.25],
                  [588.25, 437.5],
                  [589, 432.75],
                  [591, 427.75],
                  [593.25, 425.5],
                  [596.25, 423],
                  [599, 421.75],
                  [603, 420],
                  [608, 419.5],
                  [613.5, 420.25],
                  [618.5, 423],
                  [621.75, 426],
                  [623.5, 429.25],
                  [625.5, 433.75],
                  [626.25, 434.5],
                  [627, 441.5],
                  [626.25, 445.75],
                  [621.5, 451.75],
                  [616.5, 455.25],
                  [610.75, 456.75],
                  [609.5, 457.75]
                ]
              ]
            },
            properties: {
              name: 'Point de Rechargement Accueil',
              description:
                'Vous retrouverez ici un point de rechargement pour recharger votre compte cashless.',
              quote: "L'influence est une nourriture.",
              author: 'Pierre Baillargeon'
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [520.75, 626.5],
                  [549.25, 631.75],
                  [581, 635.25],
                  [617.25, 635.25],
                  [616.75, 608.5],
                  [593.25, 610.75],
                  [570.5, 609.5],
                  [549, 606.25],
                  [532.5, 602.5],
                  [523.25, 601.5]
                ]
              ]
            },
            properties: {
              name: 'B105 EAT Dream Night + Salle de bal',
              description:
                "La fanfare et l'ATECAP vous proposent un EAT des plus exotiques ! Venez nous retrouver pour vous déhancher en écoutant de la musique de qualité, vous ressourcer en sirotant bières, softs et cocktails fruités et vous amuser avec un Water-Pong, une roulette géante et d'autres festivités. Quel programme alléchant… A toute suite !",
              selling: ["Cocktail l'EXO", 'Maredsous', 'Terrano Blanche'],
              activity: 'WaterPong'
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [436.2109375, 566.234375],
                  [444.7109375, 566.734375],
                  [447.7109375, 571.234375],
                  [457.7109375, 571.234375],
                  [460.7109375, 566.734375],
                  [469.2109375, 566.734375],
                  [468.2109375, 531.734375],
                  [437.2109375, 531.234375]
                ]
              ]
            },
            properties: {
              name: 'Stand photo argentique et chapelle',
              description: "Plus d'informations prochainement"
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [475.4091796875, 554.3515625],
                  [538.1591796875, 568.1015625],
                  [538.4091796875, 561.6015625],
                  [538.1591796875, 554.6015625],
                  [536.9091796875, 545.6015625],
                  [534.6591796875, 536.3515625],
                  [531.4091796875, 527.3515625],
                  [525.1591796875, 515.6015625]
                ]
              ]
            },
            properties: {
              name: 'Bar Insaisissables',
              description:
                "Le personnel de l'UTT et l'ASANUTT s'associent pour retrouver votre vie étudiante.",
              selling: ['Plateau de fromage et de charcuterie', 'Vins']
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [381.060546875, 396.1552734375],
                  [403.1884765625, 429.5703125],
                  [456.4384765625, 394.5703125],
                  [434.8837890625, 360.814453125]
                ]
              ]
            },
            properties: {
              name: 'Bar inter école',
              description:
                "Bar géré par les différentes écoles de l'agglomération troyenne"
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [492.19140625, 611.771484375],
                  [489.19140625, 611.771484375],
                  [486.69140625, 611.771484375],
                  [483.69140625, 610.271484375],
                  [479.69140625, 607.771484375],
                  [475.69140625, 603.771484375],
                  [473.69140625, 598.771484375],
                  [472.19140625, 594.771484375],
                  [472.19140625, 591.271484375],
                  [472.69140625, 588.271484375],
                  [473.19140625, 585.771484375],
                  [474.69140625, 582.771484375],
                  [477.19140625, 578.771484375],
                  [480.19140625, 577.271484375],
                  [483.19140625, 575.771484375],
                  [485.69140625, 574.771484375],
                  [488.19140625, 573.771484375],
                  [491.69140625, 573.771484375],
                  [495.69140625, 574.271484375],
                  [499.69140625, 575.771484375],
                  [501.69140625, 577.271484375],
                  [504.19140625, 579.771484375],
                  [507.19140625, 583.271484375],
                  [508.69140625, 585.771484375],
                  [509.69140625, 589.771484375],
                  [509.69140625, 593.271484375],
                  [509.69140625, 596.771484375],
                  [508.19140625, 600.771484375],
                  [507.19140625, 603.771484375],
                  [505.69140625, 605.771484375],
                  [501.19140625, 609.271484375],
                  [497.69140625, 611.271484375],
                  [495.19140625, 612.271484375],
                  [493.19140625, 612.271484375]
                ]
              ]
            },
            properties: {
              name: 'Point de Rechargement A',
              description:
                'Vous retrouverez ici un point de rechargement pour recharger votre compte cashless.',
              quote: "L'influence est une nourriture.",
              author: 'Pierre Baillargeon'
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [424.48046875, 484.69140625],
                  [425.48046875, 490.69140625],
                  [425.48046875, 496.69140625],
                  [429.48046875, 502.69140625],
                  [434.48046875, 507.69140625],
                  [438.48046875, 511.69140625],
                  [441.48046875, 515.69140625],
                  [442.48046875, 517.69140625],
                  [435.48046875, 523.69140625],
                  [422.48046875, 532.69140625],
                  [388.48046875, 510.69140625],
                  [423.48046875, 481.69140625]
                ]
              ]
            },
            properties: {
              name: 'Bar Golden Nugget',
              description:
                "Pars à la conquête de l'ouest dans notre bar cowboy ! Tu pourras goûter à des bières venues tout droit des contrées lointaines de Belgique telles que la Delirium Red et la Maredsous ! Tu auras aussi l'occasion de tester un cocktail bien de chez nous, el famoso kir royal !",
              selling: ['Kir Royal', 'Deli Red', 'Maredsous']
            }
          }
        ]
      })
      .end()
  })
}
