// ==UserScript==
// @name         Rumble Chat Emojis
// @namespace    http://tampermonkey.net/
// @version      0.26
// @description  Replace keywords with emojis
// @author       Infrared Labs
// @match        https://rumble.com/*
// @icon         https://rumble.com/i/favicon-v4.png
// @license MIT
// ==/UserScript==

(function() {
    'use strict';

    /**
     * You can add or remove string-to-emote mappings here
     **/
    const emotes = {
        ':LETSGOOO:': 'https://cdn.betterttv.net/emote/5f7cd139ce8bc74a94247828/1x',
        ':PepeSpit:': 'https://cdn.betterttv.net/emote/5e3f1caed736527d5cd29c13/1x',
        ':pepeSpit:': 'https://cdn.betterttv.net/emote/5e3f1caed736527d5cd29c13/1x',
        ':PepeSpitR:': 'https://media.tenor.com/images/a5fe95d1daaa9864a7c79a660539b697/tenor.gif',
        ':catJAM:': 'https://cdn.betterttv.net/emote/5f1b0186cf6d2144653d2970/1x',
        ':monkaS:': 'https://cdn.betterttv.net/emote/56e9f494fff3cc5c35e5287e/1x',
        ':monkaW:': 'https://cdn.betterttv.net/emote/59ca6551b27c823d5b1fd872/1x',
        ':monkaGIGA:': 'https://cdn.betterttv.net/emote/58c36ac73c3bbd3e016b6e60/1x',
        ':pepeLaugh:': 'https://cdn.betterttv.net/emote/5c548025009a2e73916b3a37/1x',
        ':PepeLaugh:': 'https://cdn.betterttv.net/emote/5c548025009a2e73916b3a37/1x',
        ':Clap:': 'https://cdn.betterttv.net/emote/55b6f480e66682f576dd94f5/1x',
        ':clap:': 'https://cdn.betterttv.net/emote/55b6f480e66682f576dd94f5/1x',
        ':pepeJAM:': 'https://cdn.betterttv.net/emote/5b77ac3af7bddc567b1d5fb2/1x',
        ':Gigachad:': 'https://cdn.betterttv.net/emote/60a3f13c67644f1d67e888b0/1x',
        ':CHAD:': 'https://cdn.betterttv.net/emote/60a3f13c67644f1d67e888b0/1x',
        ':halalChad:': 'https://cdn.betterttv.net/emote/605857e49acbbd671d688f58/1x',
        ':HalalChad:': 'https://cdn.betterttv.net/emote/605857e49acbbd671d688f58/1x',
        ':modCheck:': 'https://cdn.betterttv.net/emote/5d7eefb7c0652668c9e4d394/1x',
        ':PepeHands:': 'https://cdn.betterttv.net/emote/60a9e39067644f1d67e8b4a5/1x',
        ':OMEGAKEKW:': 'https://cdn.betterttv.net/emote/5d75d8eabd340415e9f32b8d/1x',
        ':FeelsStrongMan:': 'https://cdn.betterttv.net/emote/6060bfc47493072efdeb620d/1x',
        ':Copege:': 'https://cdn.betterttv.net/emote/6041012b306b602acc596ddc/1x',
        ':pepePoint:': 'https://cdn.betterttv.net/emote/5fedefa19d7d952e4059e68c/1x',
        ':PepePoint:': 'https://cdn.betterttv.net/emote/5fedefa19d7d952e4059e68c/1x',
        ':TrollDespair:': 'https://cdn.betterttv.net/emote/6024574d2eae5518bece2ddd/1x',
        ':SunGorilla:': 'https://cdn.betterttv.net/emote/61ff26f006fd6a9f5be389b6/1x',
        ':SUNGORILLA:': 'https://cdn.betterttv.net/emote/61ff26f006fd6a9f5be389b6/1x',
        ':sungorilla:': 'https://cdn.betterttv.net/emote/61ff26f006fd6a9f5be389b6/1x',
        ':Soyturn:': 'https://cdn.betterttv.net/emote/63c5ceb5999b53d39ed72d07/1x',
        ':Infrared:': 'https://cdn.betterttv.net/emote/6208316306fd6a9f5be453d5/1x',
        ':COGGERS:': 'https://cdn.betterttv.net/emote/61ad7b43002cdeedc21e66eb/1x',
        ':DuginRocket:': 'https://cdn.betterttv.net/emote/620852ec06fd6a9f5be4569b/1x',
        ':HazDance:': 'https://cdn.betterttv.net/emote/612c08a1af28e956864adb86/1x',
        ':YOTT:': 'https://cdn.betterttv.net/emote/61ff269b06fd6a9f5be389af/1x',
        ':Soying:': 'https://cdn.betterttv.net/emote/61adc7fc002cdeedc21e6bc9/1x',
        ':BatChesting:': 'https://cdn.betterttv.net/emote/613ec028686f1c747a85e679/1x',
        ':Nerdge:': 'https://cdn.betterttv.net/emote/615b1406b63cc97ee6d4c76c/1x',
        ':AYOOO:': 'https://cdn.betterttv.net/emote/61b199c1002cdeedc21ecbd9/1x',
        ':NOOO:': 'https://cdn.betterttv.net/emote/61354c7baf28e956864c1e70/1x',
        ':ICANT:': 'https://cdn.betterttv.net/emote/61e74edc06fd6a9f5be13c30/1x',
        ':NOTED:': 'https://cdn.betterttv.net/emote/61268edcaf28e956864a13ec/1x',
        ':UHMMM:': 'https://cdn.betterttv.net/emote/605fd4a97493072efdeb5ce3/1x',
        ':Hmm:': 'https://cdn.frankerfacez.com/emoticon/565612/1',
        ':MeatPotato:': 'https://cdn.betterttv.net/emote/61adf862002cdeedc21e6ed5/1x',
        ':BASEDCIGAR:': 'https://cdn.betterttv.net/emote/5fbe79480d141d6f06d83d24/1x',
        ':basedcigar:': 'https://cdn.betterttv.net/emote/5fbe79480d141d6f06d83d24/1x',
        ':SmokeTime:': 'https://cdn.betterttv.net/emote/5c86b32aa787200418a68742/1x',
        ':PopcornTime:': 'https://cdn.betterttv.net/emote/5ddad7a4e9fc805efbdbda61/1x',
        ':TeaTime:': 'https://cdn.betterttv.net/emote/56f6eb647ee3e8fc6e4fe48e/1x',
        ':NODDERS:': 'https://cdn.betterttv.net/emote/5eadf40074046462f7687d0f/1x',
        ':NOPERS:': 'https://cdn.betterttv.net/emote/5ec39a9db289582eef76f733/1x',
        ':tankJAM:': 'https://cdn.betterttv.net/emote/5e7e2c338c0f5c3723aa1217/1x',
        ':cowJAM:': 'https://cdn.betterttv.net/emote/5f6ab4d59068f170aaed6b07/1x',
        ':Rave:': 'https://cdn.betterttv.net/emote/60bd9cc9f8b3f62601c39ed0/1x',
        ':xar2EDM:': 'https://cdn.betterttv.net/emote/5b7e01fbe429f82909e0013a/1x',
        ':alphaFemale:': 'https://cdn.betterttv.net/emote/6138f505af28e956864c9dd3/1x',
        ':Amused:': 'https://cdn.betterttv.net/emote/61e6e02e06fd6a9f5be12ffd/1x',
        ':TRUEING:': 'https://cdn.betterttv.net/emote/5f34967cb2efd65d77e7c9bc/1x',
        ':Trueing:': 'https://cdn.betterttv.net/emote/5f34967cb2efd65d77e7c9bc/1x',
        ':3Heading:': 'https://cdn.betterttv.net/emote/5f5cbe0268d9d86c020e615c/1x',
        ':YAPPP:': 'https://cdn.betterttv.net/emote/616f2655054a252a431fc5d6/1x',
        ':grimesG:': 'https://cdn.betterttv.net/emote/6159b6b4b63cc97ee6d49bcf/1x',
        ':Hazillionaire:': 'https://cdn.betterttv.net/emote/609aeea867644f1d67e84542/1x',
        ':hazMad:': 'https://cdn.betterttv.net/emote/61553432b63cc97ee6d40534/1x',
        ':hazYes:': 'https://cdn.betterttv.net/emote/603937f27c74605395f34c99/1x',
        ':WideHaz:': 'https://cdn.betterttv.net/emote/609af4e767644f1d67e84589/1x',
        ':jStalin:': 'https://cdn.betterttv.net/emote/616f2655054a252a431fc5d6/1x',
        ':vLenin:': 'https://cdn.betterttv.net/emote/60393d717c74605395f34cda/1x',
        ':XiJinping:': 'https://cdn.betterttv.net/emote/619a5240be3521e96a7f2610/1x',
        ':putinWalk:': 'https://cdn.betterttv.net/emote/5edd1989924aa35e32a73a25/1x',
        ':trumpPls:': 'https://cdn.betterttv.net/emote/5f9963a71b017902db151d16/1x',
        ':Hegelian:': 'https://cdn.betterttv.net/emote/613fc8ef686f1c747a860bf5/1x',
        ':PogTasty:': 'https://cdn.betterttv.net/emote/60e8c8b28ed8b373e4220299/1x',
        ':PepoG:': 'https://cdn.betterttv.net/emote/60590dc47493072efdeb29eb/1x',
        ':Cwalk:': 'https://cdn.betterttv.net/emote/5c8e64111c49205b7d7d6e1c/1x',
        ':Happening:': 'https://cdn.betterttv.net/emote/5f289d866f3782446602201d/1x',
        ':JoeBiden:': 'https://cdn.betterttv.net/emote/60528ea8306b602acc59ef12/1x',
        ':mizkifMarch:': 'https://cdn.betterttv.net/emote/5e1a2503bca2995f13fb3f76/1x',
        ':YallMind:': 'https://cdn.betterttv.net/emote/5a867a6d50e8f52680c6e7ae/1x',
        ':KEKL:': 'https://cdn.betterttv.net/emote/5e6a0d0a8c0f5c3723a904ef/1x',
        ':KEKG:': 'https://cdn.betterttv.net/emote/5ea258fdce7cbf62fe15ac59/1',
        ':Glowie:': 'https://cdn.betterttv.net/emote/61dde99106fd6a9f5be04c9c/1x',
        ':glowTime:': 'https://cdn.frankerfacez.com/emoticon/478418/1',
        ':Aware:': 'https://cdn.betterttv.net/emote/6151c623b63cc97ee6d39040/1x',
        ':Trolled:': 'https://cdn.betterttv.net/emote/62542c0d3c6f14b68844f62a/1x',
        ':TROLLPSYCHO:': 'https://cdn.betterttv.net/emote/601291a86c75a765d463f115/1x',
        ':PepoThink:': 'https://cdn.betterttv.net/emote/5a4ad2574884645e5706e51a/1x',
        ':TriBoom:': 'https://cdn.betterttv.net/emote/5e30ef3861ff6b51e65239b8/1x',
        ':AngelThump:': 'https://cdn.betterttv.net/emote/566ca1a365dbbdab32ec055b/1x',
        ':MONKE:': 'https://cdn.betterttv.net/emote/603be3937c74605395f35fd6/1x',
        ':PeepoBlanket:': 'https://cdn.betterttv.net/emote/601c0ec44e3ab965ef769138/1x',
        ':KKomrade:': 'https://cdn.betterttv.net/emote/56be9fd6d9ec6bf74424760d/1x',
        ':BBomer:': 'https://cdn.betterttv.net/emote/5ed1973710aaa55e29472b1f/1x',
        ":PagMan:":"https://cdn.betterttv.net/emote/5ffc9386eb9c37314d22013d/1x",
        ':VISION:': 'https://yt3.ggpht.com/FUCoZvCR6Kt03oPOpY_1NOQMOEswS5hWKDKSmoQvJal1aAhYq7LvhFDoCmSdQhiSKGsweGqD3A=w24-h24-c-k-nd',
        ':wokeGorilla:': 'https://yt3.ggpht.com/FUCoZvCR6Kt03oPOpY_1NOQMOEswS5hWKDKSmoQvJal1aAhYq7LvhFDoCmSdQhiSKGsweGqD3A=w24-h24-c-k-nd',
        ':SOLAR:': 'https://yt3.ggpht.com/eJmsmD9_wmmltD-ETwSpqcBJdm6856VhK1jL0eMVzblDr6K0HLz6tVRDLMVa40TBCA2mMx3ESg=w24-h24-c-k-nd',
        ':HazWut:': 'https://yt3.ggpht.com/xxUTdiUmawMq5gKK1SPvfRYzul5LJXYLh2Vm9Zx0BAfXS4HZEdRxPCnZtyZb55XwXQFOlYtjyQ=w24-h24-c-k-nd',
        ':GORILLASUN:': 'https://yt3.ggpht.com/XBXToDY1yY8wleHYs7B0F1YpffkG7Tp-fsVt9HMw52DmqhRzqYPqcFDtiR9X4BRJjxAbAwHZyQ=w24-h24-c-k-nd',
        ':SAMIREBEL:': 'https://yt3.ggpht.com/kCJXsN8Jb7xv9JGMl7q2CCTkAT0jUEdQHSgm9xJXAOG-0c0rAQ6JXBGug219LPYggQlwR7kT=w24-h24-c-k-nd',
        ':UNRUHE:': 'https://yt3.ggpht.com/kCJXsN8Jb7xv9JGMl7q2CCTkAT0jUEdQHSgm9xJXAOG-0c0rAQ6JXBGug219LPYggQlwR7kT=w24-h24-c-k-nd',
        ':5Head:': 'https://yt3.ggpht.com/NQMRhrsKBk5NJS8dq4izJSAB6vHcxbFE25r5mgCLPD7zHfqX92mCMZifqxWGqQ3mdxEYzaBE=w24-h24-c-k-nd',
        ':CRUEL:': 'https://yt3.ggpht.com/9ziio1cqsfmlRlOEYenquFoZD9V3LdnIZdlISawv-QXp2-hHojuOxJLu1SUFQCPLbJOSsd8ipA=w24-h24-c-k-nd',
        ':KRABS:': 'https://yt3.ggpht.com/cMJMmRlO_i48Nwjj8ch2vndV1JFnSeUy6Lh1Oz3Fe_bY-l6FZierVu61VOISP70UIPYtglmHGg=w24-h24-c-k-nd',
        ':TANKIE:': 'https://yt3.ggpht.com/Y6W4-udZiWeDnxof2c-u5PA81UEkZ2jJrh9lP1rzpIy5BHwUMx7uhog5ymkKbWRbteWPHg83DA=w24-h24-c-k-nd',
        ':MECHATANKE:': 'https://yt3.ggpht.com/gcrXpfUUpJpMzysol81-gzigC9GPrmg-UtL3QI0UK14NdmULNRUufi1I1Ed9y9A7FDO52OKk=w24-h24-c-k-nd',
        ':BASED:': 'https://yt3.ggpht.com/r31zlBfTICIsN3nc98PFTdaKBRDJEmEisMtaFkHMeGzGLnqlEx6BZJIo62wKky6ma2CVwLOIMg=w24-h24-c-k-nd',
        ':Based:': 'https://yt3.ggpht.com/r31zlBfTICIsN3nc98PFTdaKBRDJEmEisMtaFkHMeGzGLnqlEx6BZJIo62wKky6ma2CVwLOIMg=w24-h24-c-k-nd',
        ':based:': 'https://yt3.ggpht.com/r31zlBfTICIsN3nc98PFTdaKBRDJEmEisMtaFkHMeGzGLnqlEx6BZJIo62wKky6ma2CVwLOIMg=w24-h24-c-k-nd',
        ':KEKW:': 'https://yt3.ggpht.com/0FLRqpIWPYql08oDl3pYSE_JytvVdSnB8MI4saumn1JeaUa6Boz_9Bvx70QIP3009caHGfHBJA=w24-h24-c-k-nd',
        ':Pog:': 'https://yt3.ggpht.com/gKBwdnyylvKn1dD9o0lRhQXjx1pYAPftzCQPnPyTluDjwdhmr1LEk1VHTj-dTWOwqko2i-ntWw=w24-h24-c-k-nd',
        ':pog:': 'https://yt3.ggpht.com/gKBwdnyylvKn1dD9o0lRhQXjx1pYAPftzCQPnPyTluDjwdhmr1LEk1VHTj-dTWOwqko2i-ntWw=w24-h24-c-k-nd',
        ':CPUSA2036:': 'https://yt3.ggpht.com/NCNJ0AOXxUeIOZ3PZnzjdeaGkWMSnWUadrD-8rQUco3IaCA9DLpBeKBPYMCTu6ALk7U7HTHSNQ=w24-h24-c-k-nd',
        ':KEKWait:': 'https://yt3.ggpht.com/jypN1BGMUnlGKAFLSpcsiMIRvw3Mb3JnQ-ca8erL8abx0FMAlUKd6F5_eQPGBvwdmoUKuvmPccw=w24-h24-c-k-nd',
        ':ANGLOBOX:': 'https://yt3.ggpht.com/RGrzWPEzJCyz94yBb_wTb1U3NKKolGDc3R57YzMwAYvTmQBJTQpnzyWkbZadxHoBPElKqIMRsQ=w24-h24-c-k-nd',
        ':angloBox:': 'https://yt3.ggpht.com/RGrzWPEzJCyz94yBb_wTb1U3NKKolGDc3R57YzMwAYvTmQBJTQpnzyWkbZadxHoBPElKqIMRsQ=w24-h24-c-k-nd',
        ':GLOW:': 'https://yt3.ggpht.com/WGbCBHgmRfmUn7MQikZf_6f2r-WQbKmZ4ZL7bbWAiHjp4AILq5S3C9KKc9D-i18xLqKcs8eHbQ=w24-h24-c-k-nd',
        ':BAN:': 'https://yt3.ggpht.com/yyafi5vqtBuozyI7pU0dHAtb23PnBo8yPb9USgsR_sxr4Yz1E8txzo7JainhONSuA_9pz59DbA=w24-h24-c-k-nd',
        ':BANNED:': 'https://yt3.ggpht.com/yyafi5vqtBuozyI7pU0dHAtb23PnBo8yPb9USgsR_sxr4Yz1E8txzo7JainhONSuA_9pz59DbA=w24-h24-c-k-nd',
        ':INFRATROOP:': 'https://yt3.ggpht.com/8o-EThpx1NHmV4tgLFb-cOOaEXWLBd_BYe7FY0Idr4SxB-a0SPzsVbNl3k9O7LrewmaR5fhy5Ns=w24-h24-c-k-nd',
        ':Soynerd:': 'https://yt3.ggpht.com/u3JGpmizwBSvnZf3GSEfDXsPE-WQAsRUSNBtfc9ht-ynFiiDZHU52g_mRgxhbWE6LfGFZ6WG=w24-h24-c-k-nd',
        ':SoyU:': 'https://yt3.ggpht.com/u3JGpmizwBSvnZf3GSEfDXsPE-WQAsRUSNBtfc9ht-ynFiiDZHU52g_mRgxhbWE6LfGFZ6WG=w24-h24-c-k-nd',
        ':ANTINATO:': 'https://yt3.ggpht.com/Dq5CQ4wyp3WUy_W4m5WotVG_Grrkrh3xvPoBu5_BQT-Q5X9j9-wsqcoHJbL-g6IZxbwCrMyfRQ=w24-h24-c-k-nd',
        ':RedPeter:': 'https://yt3.ggpht.com/I_f_vv2X5V6S13mexYEd0mozVhpogkKT44b5xu7aLJ5bCxW1UfU6zmTDJiSbYEb-WIh1xvIZKw=w24-h24-c-k-nd',
        ':MECHAape:': 'https://yt3.ggpht.com/XRzvRxysTzoqgp87rw9xQDB1l30NGFFe-XEP_AxZvgUSayisYf3FY-tHkYS9Bw4JjuDpyFAcrfw=w24-h24-c-k-nd',
        ':SOLARMECHA:': 'https://yt3.ggpht.com/XZ53hqpl48RUgQpIjBLpgfUwfgZV0NmwxmMZL2InfU99ihKBRp5Z3-7xOJDIGUhxK_7R2F8sNNI=w24-h24-c-k-nd',
        ':SKYNET2036:': 'https://yt3.ggpht.com/jBKL9Ht3S3yq_E7IjYMcywhT8IOhFRIr7xkqzM2-BK4_Lv7MQUtNoiOFVPAd4EWKdpy_SkxrfA=w24-h24-c-k-nd',
        ':WOKEFUTURE:': 'https://yt3.ggpht.com/jYYvRycThqoXlD9mcopUtHQh8TkUP4ZavdkM0MtPb9J065DwTAh9SeJVLo_XO8ItMF9Cni9W=w24-h24-c-k-nd',
        ':Sadge:': 'https://yt3.ggpht.com/jTUFpfVfjnfTMvCteNf4v2e1_V730fD14fGtgz4c5rU4Yw-VeDRQOw6vIULWMNxalvGXj1NKdA=w24-h24-c-k-nd',
        ':DuginBASED:': 'https://yt3.ggpht.com/CT_QFIvY2WfvOIJvLqYoVTDx4tpchXWo5-KiLhPlPqn7HoFknoPBY86NNxq8i44MH2JPvw5m4JQ=w24-h24-c-k-nd',
        ':DUGINBASED:': 'https://yt3.ggpht.com/CT_QFIvY2WfvOIJvLqYoVTDx4tpchXWo5-KiLhPlPqn7HoFknoPBY86NNxq8i44MH2JPvw5m4JQ=w24-h24-c-k-nd',
        ':baste:': 'https://yt3.ggpht.com/CT_QFIvY2WfvOIJvLqYoVTDx4tpchXWo5-KiLhPlPqn7HoFknoPBY86NNxq8i44MH2JPvw5m4JQ=w24-h24-c-k-nd',
        ':Trumptroll:': 'https://yt3.ggpht.com/_i4fCE7YFcGtqol_g8-BMnSNs88zBItMtlTtc7w71raYIhKTM3pojR5I28PMpxdEHqHbx3e7=w24-h24-c-k-nd',
        ':REDMAGA:': 'https://yt3.ggpht.com/E1mnDKYecgFOe6YRuMOfPotVBTERr8TyoakfvxGV1bSlIMy6uAW3COb9skLTghDsPF_WUFFejZw=w24-h24-c-k-nd',
        ':Hypers:': 'https://yt3.ggpht.com/pgKgFAqVDCvcTT2Ct7h8mhuOg85YoE7ow3SoUbUdfKmcAjyh7twJ4szyIcueAN77utYAsGcmPkE=w24-h24-c-k-nd',
        ':Copium:': 'https://yt3.ggpht.com/ouy329oZaKHOX3I_LVs4BNDuRDiaQzptnQO7oqrgPcAtkUu9pIza8PfIFXfmcpCw06GLhLHDuw=w24-h24-c-k-nd',
        ':COPIUM:': 'https://yt3.ggpht.com/ouy329oZaKHOX3I_LVs4BNDuRDiaQzptnQO7oqrgPcAtkUu9pIza8PfIFXfmcpCw06GLhLHDuw=w24-h24-c-k-nd',
        ':infrar8Haz:': 'https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_81b49fb844bd4138920b88eb16f72873/static/light/1.0',
        ':HazInfra:': 'https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_81b49fb844bd4138920b88eb16f72873/static/light/1.0',
        ':infrar8Hazmad:': 'https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_eaec8890b177451cb3f88312c3671746/static/light/1.0',
        ':infrar8Hazwut:': 'https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_6dd7699f2033443d896b043bdfabbb9e/static/light/1.0',
        ':infrar8Ready:': 'https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_7d21d757470b499ca647480acd236d14/static/light/1.0',
        ':HazReady:': 'https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_7d21d757470b499ca647480acd236d14/static/light/1.0',
        ':infrar8SUNGORILLA:': 'https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_da62ed97f24b4dfea2fd4b69117b3000/static/light/1.0',
        ':infrar8TANKIE:': 'https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_c83e1f09869e4152b86100b4ded2345c/static/light/1.0'
    };

    const specialEmotes = {
        '😆': 'https://yt3.ggpht.com/0FLRqpIWPYql08oDl3pYSE_JytvVdSnB8MI4saumn1JeaUa6Boz_9Bvx70QIP3009caHGfHBJA=w48-h48-c-k-nd',
        '⚾️': 'https://yt3.ggpht.com/CT_QFIvY2WfvOIJvLqYoVTDx4tpchXWo5-KiLhPlPqn7HoFknoPBY86NNxq8i44MH2JPvw5m4JQ=w48-h48-c-k-nd',
        '😔': 'https://yt3.ggpht.com/jTUFpfVfjnfTMvCteNf4v2e1_V730fD14fGtgz4c5rU4Yw-VeDRQOw6vIULWMNxalvGXj1NKdA=w48-h48-c-k-nd',
        KEKW: 'https://yt3.ggpht.com/0FLRqpIWPYql08oDl3pYSE_JytvVdSnB8MI4saumn1JeaUa6Boz_9Bvx70QIP3009caHGfHBJA=w24-h24-c-k-nd'
    };

    const observer = new MutationObserver(mutationList => {
        for (const mutation of mutationList) {
            for (const node of mutation.addedNodes) {
                let messageElem;

                if (node.matches('.chat-history--rant')) {
                    messageElem = node.children[0].children[1];
                } else {
                    messageElem = node.children[1];
                }

                if (!messageElem) continue;

                messageElem.innerHTML = messageElem.innerHTML.replaceAll(/:\w+:/g, key => {
                    if (key in emotes) {
                        return `<img src="${emotes[key]}" style="width: 24px; height: 24px;"  title="${key}">`;
                    } else {
                        return key;
                    }
                });

                for (const key of Object.keys(specialEmotes)) {
                    messageElem.innerHTML = messageElem.innerHTML.replaceAll(
                        key,
                        `<img src="${specialEmotes[key]}" style="width: 24px; height: 24px;"  title="${key}">`
                    );
                }
            }
        }
    });

    observer.observe(document.querySelector('#chat-history-list'), { childList: true });
})();
