
GlobalStyles.ruinui_style = `<style id='main_theme' type='text/css'>
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700,900&display=swap');
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

body, html{
    background: none !important;
}

.layout{
    display: grid;
}

.js-drag-chat{
    max-height: unset !important;
    max-width: unset !important;
    min-width: unset !important;
}

@font-face {
    font-family: 'hordes2';
    font-style: normal;
    font-weight: 400;
    font-display: fallback;
    src: local('hordes Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFWJ0bbck.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}

@font-face {
    font-family: 'hordes2';
    font-style: normal;
    font-weight: 400;
    font-display: fallback;
    src: local('hordes Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFUZ0bbck.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}

@font-face {
    font-family: 'hordes2';
    font-style: normal;
    font-weight: 400;
    font-display: fallback;
    src: local('hordes Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFWZ0bbck.woff2) format('woff2');
    unicode-range: U+1F00-1FFF;
}

@font-face {
    font-family: 'hordes2';
    font-style: normal;
    font-weight: 400;
    font-display: fallback;
    src: local('hordes Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVp0bbck.woff2) format('woff2');
    unicode-range: U+0370-03FF;
}

@font-face {
    font-family: 'hordes2';
    font-style: normal;
    font-weight: 400;
    font-display: fallback;
    src: local('hordes Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFWp0bbck.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}

@font-face {
    font-family: 'hordes2';
    font-style: normal;
    font-weight: 400;
    font-display: fallback;
    src: local('hordes Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFW50bbck.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}

@font-face {
    font-family: 'hordes2';
    font-style: normal;
    font-weight: 400;
    font-display: fallback;
    src: local('hordes Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0b.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

@font-face {
    font-family: 'hordes2';
    font-style: normal;
    font-weight: 700;
    font-display: fallback;
    src: local('hordes Bold'), local('OpenSans-Bold'), url(https://fonts.gstatic.com/s/opensans/v17/mem5YaGs126MiZpBA-UN7rgOX-hpOqc.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}

@font-face {
    font-family: 'hordes2';
    font-style: normal;
    font-weight: 700;
    font-display: fallback;
    src: local('hordes Bold'), local('OpenSans-Bold'), url(https://fonts.gstatic.com/s/opensans/v17/mem5YaGs126MiZpBA-UN7rgOVuhpOqc.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}

@font-face {
    font-family: 'hordes2';
    font-style: normal;
    font-weight: 700;
    font-display: fallback;
    src: local('hordes Bold'), local('OpenSans-Bold'), url(https://fonts.gstatic.com/s/opensans/v17/mem5YaGs126MiZpBA-UN7rgOXuhpOqc.woff2) format('woff2');
    unicode-range: U+1F00-1FFF;
}

@font-face {
    font-family: 'hordes2';
    font-style: normal;
    font-weight: 700;
    font-display: fallback;
    src: local('hordes Bold'), local('OpenSans-Bold'), url(https://fonts.gstatic.com/s/opensans/v17/mem5YaGs126MiZpBA-UN7rgOUehpOqc.woff2) format('woff2');
    unicode-range: U+0370-03FF;
}

@font-face {
    font-family: 'hordes2';
    font-style: normal;
    font-weight: 700;
    font-display: fallback;
    src: local('hordes Bold'), local('OpenSans-Bold'), url(https://fonts.gstatic.com/s/opensans/v17/mem5YaGs126MiZpBA-UN7rgOXehpOqc.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}

@font-face {
    font-family: 'hordes2';
    font-style: normal;
    font-weight: 700;
    font-display: fallback;
    src: local('hordes Bold'), local('OpenSans-Bold'), url(https://fonts.gstatic.com/s/opensans/v17/mem5YaGs126MiZpBA-UN7rgOXOhpOqc.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}

@font-face {
    font-family: 'hordes2';
    font-style: normal;
    font-weight: 700;
    font-display: fallback;
    src: local('hordes Bold'), local('OpenSans-Bold'), url(https://fonts.gstatic.com/s/opensans/v17/mem5YaGs126MiZpBA-UN7rgOUuhp.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
.l-corner-lr.svelte-1axz35n{
    transform-origin: unset;
    right: unset;
    bottom: unset;
    width: fit-content;
}

.l-corner-lr.container.svelte-rhzpkh{
    width: fit-content;
}

.l-corner-lr.container.svelte-rhzpkh,
.l-upperLeftModal.container.uiscaled.svelte-1uoyfak,
.absCentered.container.svelte-9et4uw,
.absCentered.container.svelte-1fl1zyr,
.l-upperLeftModal.container.uiscaled.svelte-11akou7,
.l-upperLeftModal.container.svelte-7b6b0t,
.l-upperLeftModal.container.svelte-1tde6tk,
.absCentered.container.textcenter.svelte-1pe30wj,
.l-upperLeftModal.container.svelte-1gzciq8,
.l-upperLeftModal.container.svelte-46w0ts
{
    margin: 0;
}

.container.svelte-1lsjq6i{
    width:fit-content;
    height: fit-content;
}
.window{
    border-radius: 0px;
    background-color: #181d24;
    border: 1px solid black;
}

.window .filter{
    border-radius: 0px;
    border: 1px solid #3d444e;
    background: #2c3138;
}

.window .gold{
    border-radius: 0px;
    border: 1px solid #3d444e;
    background: #2c3138;
}
.window .btn{
    border-radius: 0px;
    border: 1px solid #3d444e;
}

.window .btn:hover{
    border-radius: 0px;
    border: 1px solid #f1f1f1;
}

.window .titleframe .textprimary {
    color: #FFF;
}

.window .titleframe .titleicon{
    display:none;
}

.window .titleframe .svgicon{
    background: #2c3138;
    border: 1px solid black;
    height: 12px;
    width: 12px;
    border-radius: 0;
    padding: 2px;
}


.window .slotcontainer .slot, .window .upgradeslot .slot, .window .upgrade .slot{
    border-radius: 0px;
    background: #2c3138;
}
.window .items .slot{
    border-radius: 0px;
    background: #2c3138;
}

.window .formatted{
    border-radius: 0px;
    background: #2c3138;
}

.panel-black{
    border-radius: 0;
}

#skillbar .slot {
    position: relative;
    border-radius: 0px;
    border: 1px solid #3d444e;
    background: #2c3138;
    padding: 1px;
    height: 35px;
    width: 35px;
}

#skillbar .slot .slotskill {
    border-radius: 0px;
}

#skillbar {
    width: fit-content;
    height: auto;
    display: grid;
    grid-gap: 2px;
    grid-auto-rows: initial;
    grid-auto-columns: unset;
    grid-auto-flow: dense;
    grid-template-columns: repeat(12, auto);
    border-radius: 0px;
    background-color: #181d24;
    border: 1px solid black;
}

#expbar {
    display: inline-block;
    width: 100%;
    z-index: 2;
    border-top: unset !important;
    height: 17px;
}

#expbar .pattern {
    background: repeating-linear-gradient(to right, #000 0px, #000 1px, #0000 0px, #0000 8%);
}

#expbar .bgexp {
    background: rgba(255, 153, 51, 1);
    background: -moz-linear-gradient(top, rgba(255, 153, 51, 1) 0%, rgba(255, 153, 51, 1) 50%, rgba(221, 145, 63, 1) 51%, rgba(221, 145, 63, 1) 100%);
    background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(255, 153, 51, 1)), color-stop(50%, rgba(255, 153, 51, 1)), color-stop(51%, rgba(221, 145, 63, 1)), color-stop(100%, rgba(221, 145, 63, 1)));
    background: -webkit-linear-gradient(top, rgba(255, 153, 51, 1) 0%, rgba(255, 153, 51, 1) 50%, rgba(221, 145, 63, 1) 51%, rgba(221, 145, 63, 1) 100%);
    background: -o-linear-gradient(top, rgba(255, 153, 51, 1) 0%, rgba(255, 153, 51, 1) 50%, rgba(221, 145, 63, 1) 51%, rgba(221, 145, 63, 1) 100%);
    background: -ms-linear-gradient(top, rgba(255, 153, 51, 1) 0%, rgba(255, 153, 51, 1) 50%, rgba(221, 145, 63, 1) 51%, rgba(221, 145, 63, 1) 100%);
    background: linear-gradient(to bottom, rgba(255, 153, 51, 1) 0%, rgba(255, 153, 51, 1) 50%, rgba(221, 145, 63, 1) 51%, rgba(221, 145, 63, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff9933', endColorstr='#dd913f', GradientType=0);
}
#expbar .bar{
    width: 500px;
    margin:0 auto;                
    border: 2px solid black;
    background: #181d24;
    border-top: 1px solid black;
}

.js-cooldown-num {
    position: absolute;
    bottom: 6px !important;
    left: 0;
    width: 30px !important;
    text-align: center;
    font-weight: bold;
    color: white;
    pointer-events: none;
    font-size: 11px;
}

#skillbar .slottext {
    line-height: 6px;
    font-size: 11px;
}

.progressBar.bgmana.svelte-i7i7g5.mana_gradient{
    font-size: 0.6rem;
}

.progressBar.bghealth.svelte-i7i7g5{
    font-size: 1.1rem;
}
.mana_gradient {
    background: rgba(6, 128, 234, 1);
    background: -moz-linear-gradient(top, rgba(6, 128, 234, 1) 0%, rgba(22, 96, 161, 1) 100%);
    background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(6, 128, 234, 1)), color-stop(100%, rgba(22, 96, 161, 1)));
    background: -webkit-linear-gradient(top, rgba(6, 128, 234, 1) 0%, rgba(22, 96, 161, 1) 100%);
    background: -o-linear-gradient(top, rgba(6, 128, 234, 1) 0%, rgba(22, 96, 161, 1) 100%);
    background: -ms-linear-gradient(top, rgba(6, 128, 234, 1) 0%, rgba(22, 96, 161, 1) 100%);
    background: linear-gradient(to bottom, rgba(6, 128, 234, 1) 0%, rgba(22, 96, 161, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#0680ea', endColorstr='#1660a1', GradientType=0);
}

.warrior_gradient {
    background: rgba(128, 98, 74, 1);
    background: -moz-linear-gradient(top, rgba(128, 98, 74, 1) 0%, rgba(93, 68, 47, 1) 100%);
    background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(128, 98, 74, 1)), color-stop(100%, rgba(93, 68, 47, 1)));
    background: -webkit-linear-gradient(top, rgba(128, 98, 74, 1) 0%, rgba(93, 68, 47, 1) 100%);
    background: -o-linear-gradient(top, rgba(128, 98, 74, 1) 0%, rgba(93, 68, 47, 1) 100%);
    background: -ms-linear-gradient(top, rgba(128, 98, 74, 1) 0%, rgba(93, 68, 47, 1) 100%);
    background: linear-gradient(to bottom, rgba(128, 98, 74, 1) 0%, rgba(93, 68, 47, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#80624a', endColorstr='#5d442f', GradientType=0);
    border-right: 3px solid #C7966F;
}

.archer_gradient {
    background: rgba(152, 206, 100, 1);
    background: -moz-linear-gradient(top, rgba(152, 206, 100, 1) 0%, rgba(86, 117, 56, 1) 100%);
    background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(152, 206, 100, 1)), color-stop(100%, rgba(86, 117, 56, 1)));
    background: -webkit-linear-gradient(top, rgba(152, 206, 100, 1) 0%, rgba(86, 117, 56, 1) 100%);
    background: -o-linear-gradient(top, rgba(152, 206, 100, 1) 0%, rgba(86, 117, 56, 1) 100%);
    background: -ms-linear-gradient(top, rgba(152, 206, 100, 1) 0%, rgba(86, 117, 56, 1) 100%);
    background: linear-gradient(to bottom, rgba(152, 206, 100, 1) 0%, rgba(86, 117, 56, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#98ce64', endColorstr='#567538', GradientType=0);
    border-right: 3px solid #98CE64;
}

.mage_gradient {
    background: rgba(6, 129, 234, 1);
    background: -moz-linear-gradient(top, rgba(6, 129, 234, 1) 0%, rgba(0, 77, 143, 1) 100%);
    background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(6, 129, 234, 1)), color-stop(100%, rgba(0, 77, 143, 1)));
    background: -webkit-linear-gradient(top, rgba(6, 129, 234, 1) 0%, rgba(0, 77, 143, 1) 100%);
    background: -o-linear-gradient(top, rgba(6, 129, 234, 1) 0%, rgba(0, 77, 143, 1) 100%);
    background: -ms-linear-gradient(top, rgba(6, 129, 234, 1) 0%, rgba(0, 77, 143, 1) 100%);
    background: linear-gradient(to bottom, rgba(6, 129, 234, 1) 0%, rgba(0, 77, 143, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#0681ea', endColorstr='#004d8f', GradientType=0);
    border-right: 3px solid #0681EA;
}

.shaman_gradient {
    background: rgba(90, 86, 239, 1);
    background: -moz-linear-gradient(top, rgba(90, 86, 239, 1) 0%, rgba(52, 51, 111, 1) 100%);
    background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(90, 86, 239, 1)), color-stop(100%, rgba(52, 51, 111, 1)));
    background: -webkit-linear-gradient(top, rgba(90, 86, 239, 1) 0%, rgba(52, 51, 111, 1) 100%);
    background: -o-linear-gradient(top, rgba(90, 86, 239, 1) 0%, rgba(52, 51, 111, 1) 100%);
    background: -ms-linear-gradient(top, rgba(90, 86, 239, 1) 0%, rgba(52, 51, 111, 1) 100%);
    background: linear-gradient(to bottom, rgba(90, 86, 239, 1) 0%, rgba(52, 51, 111, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#5a56ef', endColorstr='#34336f', GradientType=0);
    border-right: 3px solid #5a56ef;
}

.monster_gradient {
    background: rgba(250, 63, 72, 1);
    background: -moz-linear-gradient(top, rgba(250, 63, 72, 1) 0%, rgba(145, 40, 40, 1) 100%);
    background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(250, 63, 72, 1)), color-stop(100%, rgba(145, 40, 40, 1)));
    background: -webkit-linear-gradient(top, rgba(250, 63, 72, 1) 0%, rgba(145, 40, 40, 1) 100%);
    background: -o-linear-gradient(top, rgba(250, 63, 72, 1) 0%, rgba(145, 40, 40, 1) 100%);
    background: -ms-linear-gradient(top, rgba(250, 63, 72, 1) 0%, rgba(145, 40, 40, 1) 100%);
    background: linear-gradient(to bottom, rgba(250, 63, 72, 1) 0%, rgba(145, 40, 40, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fa3f48', endColorstr='#912828', GradientType=0);
}

.neutral_gradient {
    background: rgba(51, 203, 73, 1);
    background: -moz-linear-gradient(top, rgba(51, 203, 73, 1) 0%, rgba(40, 145, 55, 1) 100%);
    background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(51, 203, 73, 1)), color-stop(100%, rgba(40, 145, 55, 1)));
    background: -webkit-linear-gradient(top, rgba(51, 203, 73, 1) 0%, rgba(40, 145, 55, 1) 100%);
    background: -o-linear-gradient(top, rgba(51, 203, 73, 1) 0%, rgba(40, 145, 55, 1) 100%);
    background: -ms-linear-gradient(top, rgba(51, 203, 73, 1) 0%, rgba(40, 145, 55, 1) 100%);
    background: linear-gradient(to bottom, rgba(51, 203, 73, 1) 0%, rgba(40, 145, 55, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#33cb49', endColorstr='#289137', GradientType=0);
    border-right: 3px solid rgba(51, 203, 73, 1);
}

.targetframes {
    display:block !important;
}
#ufplayer .iconcontainer{
    float: left;
}
#uftarget .iconcontainer{
    float: right;
}

.icon.svelte-1rfiesb, .overlay.svelte-1rfiesb, .overlay.svelte-1rfiesb img{
    height: inherit !important;
    width: inherit !important;
}
.partyframes .bars , .partyframes .bars .bar:first-child{
    height: inherit;
}

#uftarget .panel-black, #ufplayer .panel-black{
    height: inherit;
}
#uftarget .panel-black .bar:first-child,  #ufplayer .panel-black .bar:first-child{
    height: 80%;
}
.iconcontainer.svelte-1rrmvqb{
    z-index:1;
}

.targetframes .iconcontainer .deco{
    display:none;
}

.targetframes .bars img.icon {
    z-index:2;
}

.targetframes .bars .buffarray img.icon {
    display: block;
}

.buffarray, .buffarray .slot, .buffarray .container{
    transition: all 0.5s ease;
    -webkit-transition: all 0.5s ease-out;
    -moz-transition: all 0.5s ease-out;
    -o-transition: all 0.5s ease-out;
    transition: all 0.5s ease-out;

}
.grid.right.svelte-mohsod.svelte-mohsod.svelte-mohsod{
    grid-template: "ba i" auto/1fr 2em;
}
.grid.left.svelte-mohsod.svelte-mohsod.svelte-mohsod{
    grid-template: "i ba" auto/0 1fr;
}
.partyframes .buffarray{
    bottom: 0!important;
    margin: 0 !important;
    height: fit-content;
}

.hidden{
    display:none;
}


.icon.svelte-1rfiesb{
    max-width: unset !important;
}
.buffarray .slot{
    width: auto;
    height: 22px;
    border: 2px solid #161E32 !important;
}

.partyframes .buffarray .slot{
    width: auto;
    height: 15px;
    border: 2px solid #161E32 !important;
}

.targetframes .bars .buffarray .time{
    position: absolute;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;    
    width: 100%;
    text-align: center;
    background-color: unset;
}

.targetframes .bars .buffarray {
    font-size: 11px;
    top: 0;
    z-index: 1;
    padding: 0px
}

.js-cooldown-num{
    bottom:10px !important;
    width:37px !important;
}



.ruin-ui-settings{
    padding-left: 12px;
    overflow-y: auto;
}

.ruin-ui-settings .settings{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 8px;
    align-items: center;
}

.ruin-cd-time{
    z-index: 9;
    font-size: small;
    width: 35px;
    height: 35px;
    position: absolute;
    bottom: 0;
    text-align: center;
    line-height: 35px;
    vertical-align: middle;;
}

.svelte-m4f7d2{
    right: unset;
    bottom: unset;
    transform-origin: unset;
}

.lockedInvSlot{
    position: absolute;
    height: 40px;
    width: 40px;
    z-index: 10;
    display: block;
    border:3px solid #b14545;
}

.timerStart {
    border-top: 10px solid white;
    border-bottom: 10px solid white;
    border-left: 20px solid black;
    height: 0px;
}

.cwindow{
    height: fit-content;
    width: fit-content;
}

.titleframe_custom{
    line-height: 1em;
    display: flex;
    align-items: center;
    position: relative;
    letter-spacing: 0.5px;
}

.title_custom{
    width: 100%;
    padding-left: 4px;
    font-weight: bold;
}

.cwindow .titleframe_custom .svgicon{
    background: #2c3138;
    border: 1px solid black;
    height: 12px;
    width: 12px;
    border-radius: 0;
    padding: 2px;
}

.cwindow .slot{
    min-height: 0;
}

.cwindow .wrapper{
    min-width: 230px;
}

.cwindow .buttons{
    line-height: 1;
    font-size: 13px;
}

.btn_cl_itemlookup{
    width: 50px;
    text-align: center;
    float: right;
    margin-top: 5px;
}

.cl_itemlookup .slot{
    margin-top:5px;
}

.cl_friendlist span{
    font-weight: 100;
    font-size: 11px;
}

.cl_friendlist, .cl_friendlist .wrapper{
    min-width: 260px;
    width: fit-content;
    background-color: #0e0f10;
}
.cl_friendlist .wrapper .addplus{
    float: left;
    width: fit-content;
    margin-top: 4px;
    margin-left: 7px;
    font-weight: 100;
}
.cl_friendlist .wrapper .addfriend{
    float: left;
    width: fit-content;
    margin-left: 20px;
    margin-top: 6px;
    font-weight: 100;
    font-size: 11px;
}

.cl_friendlist .filter_friends{
    font: inherit;
    pointer-events: auto;
    box-sizing: border-box;
    border-radius: 0;
    border: 0;
    margin: 0;
    display: block;
    width: 100%;
    background-color: transparent;
    outline: none;
    border: 1px solid #3d444e;
    color: #DAE8EA;
    transition: background-color 0.3s, border 0.2s;
}

.cl_friendlist .border_line{
    border-radius: 0px;
    border: 1px solid #3d444e;
}
.cl_friendlist .arrow.down{
    float: left;
    width: 0px;
    height: 0px;
    margin-top: 7px;
    border: 5px solid transparent;
    border-top-color: #F3F3F3;
    margin-right: -2px;
}

.cl_friendlist .arrow{
    float: left;
    width: 0px;
    height: 0px;
    margin: 3px;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 5px solid #F3F3F3;
}
.cl_friendlist .friends_span{
    margin-top: 2px;
    float: left;
    margin-left: 12px;
}
.cl_friendlist .friends_total{
    margin-top: 2px;
    float: left;
    margin-left: 12px;
}
.cl_friendlist .acc-header{
    height: 15px;
    padding: 5px;
}

.cl_friendlist .acc-body{
    padding: 3px;;
    height: auto;
    display: none;
}
.material-icons.md-18 {
    font-size: 18px;
}
.material-icons.md-24 {
    font-size: 24px;
}
.material-icons.md-36 {
    font-size: 36px;
}
.material-icons.md-48 {
    font-size: 48px;
}
.material-icons.md-dark {
    color: rgba(0, 0, 0, 0.54);
}
.material-icons.md-dark.md-inactive {
    color: rgba(0, 0, 0, 0.26);
}

.material-icons.md-light {
    color: rgba(255, 255, 255, 1);
}
.material-icons.md-light.md-inactive {
    color: rgba(255, 255, 255, 0.3);
}
.cl_friendlist_friends .name{
    float: left;
    margin: 7px;
    margin-left: 10px;
}
.cl_friendlist_friends .user{
    height: 25px;
    margin-top: 4px;
}
.add_friends_inp{
    font: inherit;
    pointer-events: auto;
    box-sizing: border-box;
    border-radius: 0;
    border: 0;
    margin: 0;
    display: block;
    width: 100%;
    background-color: transparent;
    outline: none;
    border: 1px solid #3d444e;
    color: #DAE8EA;
    transition: background-color 0.3s, border 0.2s;
}
.add_user_by_name{
    font-weight: bold;
    font-size: 15px;
    padding: 5px;
    text-align: center;
}

.cl_localclock{
    height: fit-content;
    width: fit-content;
}

.pinkmode{
    background-color: pink !important;
}

.gold.svelte-1ilvxqc{
    padding: 2px 4px;
}

.gridmode_grid{
    background-image: linear-gradient(rgba(255, 255, 255, .5) .1em, transparent .1em), linear-gradient(90deg,rgba(255, 255, 255, .5) .1em, transparent .1em);
    background-size: 5px 5px;
}

.gridmode_grid:after {
    content:"";
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: 50%;
    border-left: 2px dotted #ff0000;
    transform: translate(-50%);
}

.ui-resizable-helper { border: 2px dotted #00F; }

.mapCanvas566{
    height: 600px;
    width: 600px;
}

.cl_itemlookupitemwindow  .slotdescription{
    position: unset;
    width: auto;
    padding: 8px;
    z-index: 11;
    pointer-events: none;
    background-color: #10131d;
    color: #a6dcd5;
}

.cl_friendlist .dot {
    height: 6px;
    width: 6px;
    border-radius: 50%;
    display: inline-block;
}

.cl_friendlist .dotSquare{
    position: relative;
    border: 2px solid #1f262f;
    margin-left: 10px;
    width: fit-content;
    height: fit-content;
    padding: 7px;
    border-radius: 0px;
    float: left;
}
.cl_friendlist .dotSquareList{
    padding: 7px;
    float: left;
}
.cl_friendlist .greybg{
    background-color: #bbb;
}
.cl_friendlist .greenbg{
    background-color: #77ff3b;
}
.cl_friendlist .redbg{
    background-color: #ff3b3b;
}
.cl_friendlist .yellowbg{
    background-color: #ffaa3b;
}
.cl_friendlist .grey{
    color: #bbb;
}
.cl_friendlist .green{
    color: #77ff3b;
}
.cl_friendlist .red{
    color: #ff3b3b;
}
.cl_friendlist .yellow{
    color: #ffaa3b;
}

.cl_friendlist .cl_friendlist_menu{
    margin: 6px;
    min-height: 25px;
    margin-left: 0px;
}
.cl_friendlist .btn{
    width: 70px;
    float:left;
    position: relative;
    text-align: center;
    border-radius: 0px;
    border: 2px  solid #1f262f;
    margin-left: 10px;
    font-size: 10px;
}

.cl_friendlist .acc-header:hover{
    filter: alpha(opacity=80);
    opacity: 0.80;
}
.cl_friendlist .btn:hover{
    filter: alpha(opacity=70);
    opacity: 0.70;
    border: 2px  solid #1f262f !important;
}
.cl_friendlist_list ul{
    height: 200px;
    padding: 0px;
    list-style-type: none !important;
}
.cl_friendlist_list ul{
    overflow:hidden; 
    overflow-y:scroll;
    border: 3px solid #1f262f !important;
}
.cl_friendlist_list ul li{
    border: 1px solid #1f262f !important;
    padding: 12px;
    padding-left: 7px;
}
.cl_friendlist ul li span{

    font-weight: bold;
}

.cl_friendlist_list ul::-webkit-scrollbar {
    width: 10px;
}

.cl_friendlist_list ul::-webkit-scrollbar-track {
    background: #0e0f10;
}

.cl_friendlist_list ul::-webkit-scrollbar-thumb {
    background: #1f262f;                   
    border: 2px solid #0e0f10 !important;

}

.cl_friendlist_list ul::-webkit-scrollbar-thumb:hover {
    background: #1f262f; 
    border: 2px solid #0e0f10 !important;
}
.cl_friendlist .blue{
    color: #0072ff;
}
.cl_friendlist .textprimary{
    font-size: 13px;
    padding: 3px;
}
.refreshIcon{
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAIelJREFUeNrs3e11W8XaBuARi//2qcCiApsKLCqIqSBKBZgKYirAVICoAKUC5ApwKkCpAKcCnT1oNlFMnFjS/po917WWlsN53wXxSJrnns8dAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIzTRBNAvjabzVn1Y/qZ/5fT6nXxzH/d6hP/28NkMnmrpUEAAJov4ic7RXq6U9AfF+/pF4p9F9bp9fjPdXhYV4HhnXcVBAAwQt8W7bqY7xb1+p/H6KF63X/ip4AAAgCMrsjXBX0W9pt6L1EdClb1TEIVDO40CwgAMORCPwsfpuNnWqZR6/Sqg8G9PQggAECXxf48jeDrl0Lf/4zBvy+zBSAAQFMj+7rIK/b5WO2EgpW9BSAAwHNG97Odgj/VKqNQ7ylYpUBg6QAEABT8fwt+fJ1qlWICQZwdWAoEIABQRsE/S4X+SsHniRmCpSUDBAAYR9F/sVP0p1qEZ1jXYSDNELzXJAgAMPyCf5KKvVE+TanDgNkBBAAYWNE/2yn4V1qElmcHYhhY2DuAAAD9jfTn6eVmPfoMA0v3DyAAQPtF/2rnBUPxkMLArZkBBABorvC/SAV/rjXIaGbAMgECABxQ9M/Chyn+qRYh4zBwG2wgRACALxb+l6noz7QGI1PvF/hNUyAAwMej/evg2B7jZ78AAgDFF/7L8GGaH0oUrySulwhcOIQAwOgL/8s02nd8Dz7MCizSrIC9AggAjKron6SiH0f7Uy0CT1qlIPBGUyAAMIbCb30f9rOuXjfB8gACAJkV/rOdEb/CD4eLywO3aVZAEEAAYNCF/ybY2AdtWMTvl30CtOkrTcCehf+kev0cttOWij+0I3631tV37dcUtsmnf8zm/RIA2OeD/ToV/mstAp0GgT/ScVoG3EeG7cbOqQDAmD7YdeG/Cdb5oQ+zWFwEgcH2kWep+Gd15FkA4HMf6pfV6y+FHwYZBCwNDKOfPA/bi56yu+9EAOBTH+jL2MGE7UakqRaBQQYBewSGUfxXuQ6QBAB2P8xxnf/X9IGeaREYvPlOEDjRHIq/AMAhH+Z6nX+uNSDbIPBaEFD8BQCe+0GO0/1/Buv8kLvT9D1ep+dw0FKfOYbiLwCU/SHene73sB4YVxBYxGDvxEDj/ebLsRR/AaDcD/GLYLofxi4G+3hi4HcbBRsr/osx/U4CQFkf4LO0u38ZTPdDKa6q133a54PiLwAU+AH+IWzPqs60BhTnn/0B8V4PywKKvwBQ3qj/1qgfijcN22UBxwaf13++HmvxFwDG/+F9YdQPfMI8OC3wpf4zbpK+GfPvKACM84Mbd/j/Hqz1A0+rTwu4VvjTxX8+9t9TABjfB/cyjfqvtAbwDLOw3ST4g6Yop/gLAOP74Mb1qlVwfz+w/2zAbemzASUVfwFgPB/aeqPfjdYAzAbs3YfWy6bzkn5vASD/D2495T/TGkDDswGjPymQfsdVKHDZVADI+4NbT/nb6Ae0MRuwTqeJxl78i7wOXQDI9ENryh/oaDZgWfU3P49tNqD04i8A5PmhjY+hNOUPdOk6bC8QOlf8BQD6+dDWT6Kaag2gY/XDhbK+PGhnEFX8U1AFgHw+tPWVlNb7gb7UlwdleZVwKv4GUQJANh/YkxKupASyMg+ZLQnsFH+DKAEgj+KfPrBzrQEMTL0kMPhTAoq/AJBb8Y8f2HWwTgUM17+nBBR/AYBmPrCXPrBARq6HeHHQzsZpfakAkEXx94EFcjQLA9oXkPrShb5UAMip+C+0BJCpel/Apb5UAOD5H9hffWCBETgNPd4XoPgLADkW/7mWAEZkkfo2xV8AQPEHCjPv6tIgs6gCQE6F/0TxB0oIAWG7JNBaCNCXCgBZFf/ggh+gHBdthQDFXwDIsfi74AcoLQSsmzwmqPgLAIo/QB7qEwJHhwDFXwBQ/AEKCgFp/9Sfir8AkBPFH+DjELDXXQEGUgJAjqP/X31gAf4TAhbPDQGKvwCQa/GfawmAT/piCFD8BQDFH6CwEFD972eKfzu+1gSKP8BAQkCYTCa/7fSj58HTUc0AZFb8Xyr+AIfPBCj+ZgByLf4LLQFwcAiYVj+vFf92TTRBo8X/MiVWAMo0m0wmdzn8RS0BNFf843TVUksAIACUU/xPUvE3XQWAAFBQ8V9Vr6nWAEAAKMdtcD4VgMw4BXDc6P91cNyPvDxUr/v052kwcwUCAHsX/3jc70ZLMKCivlvc639+mEwmbw/8jJ89Cgi7gSHud6lnvi6C/S+QHccAD+sYXVBBH+Jnbp1e96m43w3oe3G2ExJ2XwICJcnmGKAAsH8nd5I636nWoCV1gb+vi37VobwbwXfncicUzAQDBAABILdO7I/UeUETHlKRr4v9fdV5vC8sUF/sBIIL4RoBoBv2AOzXWf2s+HOk3ZH9agwj+6NGINuwc5de9ffsbCcU1MEAMAPQW/F/Edz0x/7WqdgvU8F/r0kOmiWYCQSYARAA+uiAztKozXolX/LwqOC/0yStBIKrFAaufC8RAASANjucP406+MIovy74bzRH59/PeCpnnsLAVIsgAAgATXUucd3/WkvwSJwRWqSi/1ZzDOb7epaCwFxoRwAQAI7pTKz786mivzS1n00YuDYzgAAgABzSeVj3Z51C4K2in/X3+XwnDPhOIwAIAJ/tMJz3L9fDTtE3vT++73a8xnvu+03pAcDTAD/dQbzWORRpFQtD9eX9X/V6pfiPU/W+/la9vgvbZYHbFPigvO+CJvhP8Y9ThfdaoqjR/iKY4i/5O18fK7wJ9gpgBqDojsCmvzLc74z2f1T8i54ReJ9mBb5JQWClVSiBAPAxI4DxW6aE/m3s9DUHj8LAm7Q8MAvbmSEQAAoY/ccnlTnvP071NP+06ty/z2V6jl6DwF3cB5IGBIIAAsCIi/+JL/loC/9NKvyvTPNzQBB4JwggAIzbTTD1P9bC/5MH8NBwEFhpEQSAcYz+Tf0r/LBPEKj3CAgCCAAZF39T/wo/HBIE7lIQmIftbZEgAGTmn6LhY5C1W4WfHoNAPElykfoSFwohAGQy+q/vBidPi1T4f1T46TkExHsEfkpBwD0iCACZFBDyswrbc/x29TO0IBD3B3wftpcJrbUIAsAwR/+vg2eF5yZOr8ab+75zjp+BB4E3qX+51RoIAMMq/vUzwslHvc7v5j5yCQFxWeDHsD0tYDYAAWBAxcTzwPMQ7+u/sM5PxkHgzmwAAsAwRv/xzP+Vt33w4nT/dbqv3yN5MRsAAsDRFt7ywVulUf8vmoKRzgY4KYAA0PHoP278m3rLBz/q/87ufkY+GxBPCsyDewMQADop/jb+GfXDkIJA3NA6C9t9LiAAtOgm2Pg3VEb9lBoC3qYQsNAaCADtjP7jxr+5t3pw7o36EQL+WRKITxk0Q4kA0NLon2GJI56ZHf7wbxD4Jc0G2BeAANDQ6P9F+lIxDPVtfq+c64f/hIC7YF8AAkBjXL4xHPdp1O82P3g6BLwVAhAAjh/9/xAc+xuKZTDlD88NAXFfwLfB5kAEgIOK/0mw9j8UN/Hcsyl/2DsIvBICEAD2F3fUOvbXr7jef5Wekw4cHgIMZhAA9hj9O1LTr3XYTvm/0RRwdAiIIXquJWja1yP8nW6M/ntVb/Yz5Q/NhYDfqsFN/ONCa2AG4NOjf1f+9mup+EN7IcBMAALA50f/9GNhsx90EgIMchAAPjH6l477cZs2KwHth4B4a+BCS3CsMe0BMPrvx9zlPtB5CHiV9gQY9FD2DIDRv+IPJYaA4MZASg8ARv+KPxTKdeeUGwCM/hV/KFHV950LAJQ+A2BHrOIPJRb/VXDnCaUGgHTrn9G/4g+KPxQ2A+DOf8UfSir+cdCz1O9RdABw53+3QUvxh0H0eXHkP9UalD4DMJeCO7FIF48A/Rf/C62BAGD031Xxd8Mf9E/xRwBIafhlMA3WtnvFHwbR3/2q+CMAfDD31rVb/KvXTDPAIIq//g4BIH0hLhWnVj2E7Y5/T/UDxR8BwOi/IFdV8X+rGaDX4v+Dvg4B4OMvhWt/Ww5XVfG/0wzQaz8X9zi54hcBwOi/Mwtn/WEQxX+hJejCJLMvx9/B2f82xB3/32oG6LV/exG2t/yRt1kuM6lfZfTleKn4tyJu+rvSDNBr/3Zu5I8A8DQX/7Qjrvu/0wzQa/FfGeAgADz9BXERRvNuq+L/RjOA4o8AYPRfjrju/6NmgN6Kvyf7IQA840tijbpZ1v2h/34tjvynWgMB4GlXEnLjrq37Q+/F37ImAsCXipW3qVFL5/2hV4o/AsAzkrLNf836555/zQC99Wme7IcA8EyKVcPt6SE/0Gvx16chAAgAnVs68geKPww+AKRrMW3+a4apf+ivL/NkPwQAo//e3Jj6h16Kvyf7IQDs+aVx9r85q6r4/6IZoJfiv9ASCABG/31xjBK6L/4vFH8EAAGgT/Gu/7eaATot/p7shwBw4JfnLDgn24S48e9GM0DnxX8VbGBGADiItf9m2PgHij88aTLAL9FfwQMyjrWuiv83mgE667fixuV7fReVWdX/3pkBOCxB+wIdb64JoNPiv9J3kZuhLQEoXMdb5ZI+YUTF374lBIAjWf8/3o0mgO4Ct+KPAHB8kjb9b/QPOY3+PdkPAaAhc2+HNoSMir/vGwJAQ0z/H2dRjf7faQZQ/CGbAGD6vxE3mgBa76s82Q8BoGEzb8VRlkb/0Hrx92Q/BIAWSNTH0SlB+8V/oSUQAJr9Yrn7/zh2/kO7fZQn+yEAtMTmv+PcaAJorfh7sh8CQItm3oaDrY3+odXivwoe7oMA0MoX7MQMgNE/KP5Q3gyA0f/hHqrR/2+aAVoZmCwVfwSAdhn9H87Of2in+MeR/1RrMHaTnr9sf/miHWzq7D+0EgCcSuIY91Xf/F4A+PwXLa6x3fusHCRe/PO9ZgDgUH0uAcw0/8EWmgCAXAOA9f/DxKN/bzQDAGYAyrLUBABkGQDS1Zocxu5/ALKdATD6P8y9nf8ACABG/wBwkM6PAaZztg+a/iCnuZwvBcAMwGN2/x9mqfgDkHMAmGn2wwKAJgCgKX0sAbj+9zCm/wHIcwagKv5niv9ho3/FH4BsA0Aw/X9wANAEAOQcADxlSwAAwAwAz3Bv+h+AbAOA52wfbKEJAMh5BsDo/zArTQBAzgHA6H9/8dG/bzUDAGYAjP4BQAAYObv/Acg3AGw2m3NNbQYAgPJmAIz+9+f4HwDZBwAbAI3+ARAAEAAA6FMnTwPcVDT13jz9D4B8ZwCq2n+pmfdm/R+AvANAMP1/iJUmAEAAKHAGQBMAIACYAQCARrW+CdAGwL09TCaT/2kGALKdAbAB8CCm/wHIOwBUppp4bytNAEDuAcD6vxkAAAQABAAAhqDVTYCbzebv6sepZt7jDaloBQCynQGoiv+J4r+3lSYAIOsAEEz/H8L0PwDZB4CZ5t3bWhMAkHsAMP1vBgCAAgOAJQABAICBam3HuRMAB7wZTgAAkPMMgBMAB1lpAgCyDgDB9P8hHjQBALkHgKmm3Zv1fwAEgAKtNQEAuQcASwACAAAFBgAbAAUAAAaslWNnm4qm3fONcAQQgBHMALAfJwAAyDsAVIP/S826NycAADADAADkFwBmmnVvK00AgBkAAMAMQAHWmgAAMwACAABkFwDcAggABQYAtwCaAQBg4Bq9fW6z2ZwEl9rs/ya4BRAoTFUvXlc/brTE3mZVybgb4gyA6X8AaG/AeNfUv8smQAAoUNMBYKpJ9+YaYAAEgALZMwFA9gEAADADAAA0ZCUAAJA7d8aMbAaA/dkECJTIsXEBoHg2AQLwHOshB4CZ9wcAygsAAEAGBAAA+mAToBkAAApkE6AAAAB0rbEAsNlsLjUnALSm0WPjnkMPQKeqAeN5cAfK/gW7MsgZAAB4JhsA99f4nTECAAAMX+MzJgIAAF2baoL+CQAACADDtxIAAAABAIDszDSBGQAAoAfuAQCgU5vN5u/gKOB+xbrhOwAEAAD6CAAbrdB/ALAEAECXxf9MK+xt1ca/VAAAoEtTTbC3hzb+pQIAAALAsLXy3AQBAAABYNjWAgAAubvQBAIAAOVx/G9/rSwBOAYIQGccAdzbw2Qy+Z8ZAAByLv4nWmEYo38BAIAuWf8XAAAQAHiGh7b+xQIAAF2ZaoK9rQQAAMwAlKe1JQCnAADohBMAe2vtBIAZAAC6Kv4eAjSg0b8AAEBXTP8LAAAIAAgAAJRgpgn2tm7zX24TIACt22w2fwfPAdivQFfMAACQc/E/U/z3dt/2f0AAAKBtM00gAABQHhsABQAAzAAwhABgEyAArUmPAH7QEnsW55Y3AJoBAMDov8DRvwAAgAAgAACAACAAAMAR0vq/EwD7WwkAABj9F2YymbwVAADI2ZUmGOboXwAAwAyAAAAAzdhsNufVj6mW2Nt9V/8hAQAAo38zAADQiLkm2H/0P5lM3gsAAGTJ8b/hj/4FAADaYPf/gTMAAgAAAoAZgFZ5GiAAjfH0v4OtJ5PJN2YAADD6N/oXAAAQAASAZlkCAKARpv+PctrlEUAzAAAY/ffvvuviLwAA0KRrTXCQVR//UQEAgKNtNpuz4PIfAQAAo3+eZzKZvBEAAMiV9f+MRv8CAABH22w2L4JH/x5qKQAAkKu5JshvBiCbewA8XYoG9HLUBkY++o+b/9Za4iCdX/+76+uMGuqiz6RE/sW/es00Axj9G/1vWQKgBPFmspnRP7TC7v/DLfv8jwsAKP7AQTabzcvqx6mWMAMAQy3+bzUFtOJGExw++u97YCIAoPgDh4z+L4Ojf9mO/gUAxuxa8Qej/yHPAAgA0Lx5Vfx/0wzQ6uh/piUOFo8kvxMAQPGH3Nj5f5zFEP4SAgBjcqP4Q+uj/3jxj3v/j7MSAKDBRF0V/580A7QftDXBUdZD2Z8kADCW4v9KM0Ano/+5ljjKcih/EQEAxR949vdNE4ynDQUAchbv97cZCboZ/dv5f7z1kI4nCwDkXPxd8QvdudEER1sO6S8jAKD4A0b/3VgIAHA4D/eBwgtXptZDu51UAEDxBz43+v8huPO/CbdD+wsJAORW/N3vD90V/5Ng7b8py6H9hQQAFH/gKbH4n2qGow3i7n8BgBx5sh90P/o/D47ZNmUxxL+UAMDQebgP9ONWEwgAoPhDWaP/uPFvpiUasRzqxmUBgKHyZD/op/jb+FfA6F8AYLBfGE/2g14Llo1/zXio+rI3AgA8v/h7uA/0M/p/Uf240hLjH/0LACj+QF38T4Ib/wQA6IEn+0H/xcrUf4N92tCPLwsADKX4u+IX+hv9vwym/ps2+GOUAgCKP5Rd/M+CM/9Ni7eXLof+lxQA6PtLovhDv2KhMvXfcJvm0K8JACj+UO7o/+fqx4WWaFwWMyoCAH0Wf/f7Q3/FPx75s/G2efe59G0CAIo/lFf847r/QkuUO/oXAOiDJ/tB/6z7tzTAyekKcwGALnm4D/Q/+v81WPcvfvQvAKD4Q1nFP573n2uJ1iwEAPiYJ/tB/8X/Mlj3b7X4V/3cOwEAPv5SeLIf9Fv8z0MGF9MY/QsAjKv4e7gP9Fv864f82PTXnlXV190JAKD4w6CKU7Dpz+hfAKAjnuwHwxj92/HfvnWue5wEANoo/q74hWEU/7mWaF22D1ISAFD8YXzF/wfFvxPxZtOFAIAvguIPQyj+L4PH+3Y2+s+5zxMAUPxhXMV/oSU66/eyDloCAE0Vf/f7g+JfkkXugx4BAMUfFH/2l/0yiwDAMW4Uf1D8Cx39v8v9lxAAOMZcE4DiX+LgZwy/hADAMS7SWWNA8Tf6FwAobRZACIDOi//Pir/RvwDAUELAD5oBOin+MXC7atvoXwBgMG7TlCTQTuE/qV6/B3tvjP4b8rX3kybTcdVBhVwfjAFDLv7BU/16H+SMafRvBoC2QoCZAGiu+J+H7XM2FP/+PIxt9C8A0GYIeK0Z4Oji/yKN/Kdao/fR/+iuOhcAaMuN0wFwVPGPIXpZvU61Ru+j/1E+XMkeANo0T3sCXmkKeHbhj+v9i+p1pTWGMZgZ64POzADQRQj4M3VqwOeLf1zvXyn+g7Guiv8vY/3lBAC6EDcvrVLnBny6+L8MdvoPzajvWxAA6DoEXGoK+Kjwn6T9MotgvX9IVtXo/40AAM04TSHArYEQPpryn2uNwbkZ+y8oANCHeGvgr/YFUHjxj0HY+f5hilf+3gkA0I55sC+AMgv/WfX6I4z0aNkIjPLSHwGAoan3Bbg5kNJG/TOtMViju/L3KZOMvjhx89jKZ3O04oUn87Get8WoP2w3+Sn8wxaP/X1Tyi9rBoChiOee750SwKifHs1L+mUFAIZkGrZLAj/bIMgICv95vAQrbNf6He8bvmUJG/8EAIbuOrgzgHwLfzzX/3Owwz8nD2Hkl/4IAOTkwmwAGRb/uKF1XWIxyVwxG/8EAHKbDbhPj0WFoRb+y3S0bxFM9+fmvir+P5X4iwsA5GBavZZVB/t72k0NQyn88Uz/72F7QmmmRbI0L/UXFwDISX1S4LVlAXou/PU6/zp4cl/O4tT/WwEA8hCnV29SEHCBEH0U/tfBOv8YrEMhN/4JAIzNtHot4rqr0wJ0XPhvgnX+MSj+4jEBgNzNwva0wB/2B6Dw80y3pZ35FwAYexBYp6cMCgIo/Dylfk+LJwAwNnNBgCMKf9zV/6vCP+4+wjNHBADKCQL2CPClwn+ZjvOt02dH4R8nU/87PA2QUqzSl/+NpmCnX4knSeJuflf2jl8MdxdG/2YAKM8sbC8T+it2+u4RKLron6Urpv8O25v7FP8yXCn+AgBlm6ZOf52KgH0CBY3203W96zTqN81fjpuSL/x5iiUA2H6uFlUH8ZumGF3RP0/F/krBL/f7XX23v9MMAgB8Tnwk6DIUfj3oCIr+2U7Rn2qR4r/TFyU+6U8AgMOtd8KAziOPoh8L/jxY0+eDKxt/BQA4xn3Y7htYCgOD6hPi9P5M0ecJMbz/qBkEAGh6ZmBhmaCXfuBFKvqm9/lsaK++n99qBgEA2lLvGVil2QFHjJr/3p/tFPz400Y+nvO9tO4vAEC3o470Gf3nJRAc9D0/eVTwjfLZl3V/AQAGFQjujUg+O8KPr4tgLZ/jWPcXAGCQ1ikU3O+EgmJmCdLo/mKn2MefpvRpivP+AgBk5WEnEMSAsB7Dw0rSyH76aGQ/9XbTYrh2z78AAKMKBuvHryEtJaTv5elOga+LPnT5XZk5lbO/rzUBDNLpU4W0Krq7ASGknw87I6H17sjo0MCQztmf7hT4kH6e7vyEvl0r/gIAlBoQZl8o5J/7P+8GBkWd3Nx4hocAABxmGqzNk6d4GddPmuFwHgcMQG7iste1ZhAAACjHOmw3/dnxLwAAUIi42fVK8RcAACjLlR3/AkBuifVGMwAcZT6GS7KGxCmA9ov/PxdUbDabddg+Ux6A/Yu/435mAPIr/vEf0od3rlkA9rJQ/AWAnMQjKheP16qEAIC9i/8rzdAOSwDtFP8nj6jEEJBuZltoKgDF3wxAAcXfTACA4i8AFFr8PxECHjQdwIe+VPEXAEZb/B+FgJkQAPChL9UMAkAu4lTVt4feTJU2CgoBgOLvil8BILPif/RUlRAAKP6KvwBQWPF/FAKm6YsAoPgjAIy9+O+EgPdpJkAIAIroSxV/AaD44v+JELDQ1MDY+1LFvz8uAtpPJ/dRpy/Eq3Rh0FyzAwZSmAEYefF/FAReCQCA4o8AUFDx3wkB7goAxtSXKv4CgOK/Rwi4CzYHAvpSBIBOPAzpA7tzV8DKWwNk1pfOFH8BwAf2uBDwvnp9V/3x1lsEZNSX3mkKASCnD+zbof4Fq7/bj9WPq2BfADBccclyOuS+VAAgq+K/EwLeBPsCgGFaBBf8CACKf6shoN4XsPD2AQNx44IfASAn69yK/04IeL9zX4AlAaDPQVTcOP2TphAAchGn0C9yX6fauS/AkgDQ1yDKTn8BIKviP5p1qp0lAacEgK6sxjCIEgAU/zGEgPdOCQAdiev931nvFwAU/2EFgXhKYBpcHAQ0r940bb1fAMjKMhRyPGXn4qBrswFAQ+KgYupyHwEgN/EpVN+XNl1V/b6/VD8uzAYARzLlLwBkW/yLfQpV9bu/MxsAHGgdTPkLAIq/2QCgKHHZ9MKUvwCg+I9rNmBuNgB4QuwbrkpcNhUAxuFG8f9sEIiXdkyDq4SBj63SqP+NphAAcuRKyueFgPoq4VnYrvMBZY/6r9NGv3eaQwDItfi7knK/IHBXvb6p/ngTLAtAyaP+XzSFAKD4lxkE4qxJ3CS41BpQzKj/yqhfAFD8qTcJfh88XAjGbhG2l/pY6xcAsk6wnkTVfBCIywLfBqcFYGzq69Bf2eEvAIyh+Duj2l4QqE8L3AgCkH1/GU9HfavP5KsRfJhnHkPZSQh4n/YHxCCw0CKQnfi9nTodxRgCgOLfXxB4JQhANlbBdD8jCgCKf/9B4N1OEFhpERicddhujP7OdD9jCQBx88qF4j+oIBCvFZ4JAjCYAVJc5//GxmjGFADqnavOqg4vCNwJAtB/4Q/W+Xluv53LX3Sz2ZzFD7g1rKzer9gZzbUGtC5+1271j4wyACAIAP+xCNvpfrOiCAAMNgicVD+u0+tUi8DBHlLhv1X4EQDILQhcpVmBqRaBvQr/bTDVjwDACMLAizQjMNMa8KT1zohf4UcAYFRB4CwFgXmwPAC1+1T0HeVDAGD0QaBeHohh4EKLUKg42l+4vAcBgFLDwHkKAldmBShAvb6/sLEPAQA+hIGXKQhcaQ1GZpWKvml+BAD4TBA4Cx+WCKZahEytw4dpfqN9BADYMwzEJYJ5CgTCADmIRX9ZFf03mgIBAJoLA/YLMETL+uUIHwIAtBMC6j9ehg/7BcwM0If78GGKX9FHAICWCv7nWCagy5H+Ko30resjAEAPRf8pZzszAzOtyZEe6oIfTO8jAMDgiv5TTlIIqMOA2QGeY12P9G3kQwCAfIr+c2YHZullIyGPR/nx50dT+1UI0EIIAJBp4X/K+c4MwYVAUFzBr19vn92RCgMIAJBt0X9OIDBDMC7rsN2xv3fBFwYQAGDchf8pZykIXKTXzDuahdVOwY8/W92tLwggAMA4iv6XXO4EgvpF/8W+fr3t8y8jDCAAoPCX5TwFgWn4cNpg6hPReKFfp1f950GfwxcGEABQ+Mt1uRMGYjA4NWPwWXEEX2/Qe0j/PPhCLwggAKDo81xnKRRc7ISC3Z9jVBf03UJf/8y+yAsCCAAo/DQZEEL4sPFwuvO/7f65L+v0ejx6f/x/i/+72/OEAQQAFH5acP7EzMFzZxRWzyj27r0XBBAAUPgBQQABAIUfEAQK7B9zeb98qlD4QRCgwT5SAEDxBwSBAvtIAQCFHxAECuwnBQAUfkAQKLCvFABQ+AFBoMD+UgBA8QcEgQL7SwEAhR8QAgrsMwUAFH5AECiw3xQAUPwBQaDAflMAQOEHhIAC+04BAMUfEAQK7DsFABR+QBAosP/MpV2/8hb78AL6CMprG/HPBxfAbECDfagZABR/QN+hHcwA4IMLmA0ooQ+1CRCFHxACCuxDBQAUf0AQKLAPzaXN/i/AAOJfyWl90DTHAAAAAElFTkSuQmCC');
    background-repeat: no-repeat, repeat;
    background-size: 13px 13px;
    background-position: center;
    height: 13px !important;
    width: 13px !important;
}
.panel.context.border.grey, .cl_friendlist_contextmenu{
    z-index: 99;
}
.container.svelte-wy3b00.svelte-wy3b00 {
    max-width: 50%;
    max-height: 70%;
}            

.svelte-wy3b00 .search .border.slotdescription.svelte-18ojcpo{
    display:none;

}

.slotdescription.svelte-18ojcpo{
    z-index: 999999 !important;
    
}

.displayblocksd .slotdescription{
    display:block !important;
}

.cl_chat{
    position:absolute;
    margin-top: -2px;
}

.js-chat{
    width: fit-content;
    background-color:rgba(14, 15, 16, 0.2);
    flex: 1 1 auto;
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 0 !important;
    border-radius: 0 !important;
    pointer-events: all;
}

.js-chat ::-webkit-scrollbar {
    width: 10px;
}

.js-chat ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
}

.js-chat ::-webkit-scrollbar-thumb {
    background: #1f262f;                
    border: 2px solid #0e0f10 !important;

}

.js-chat ::-webkit-scrollbar-thumb:hover {
    background: #1f262f; 
    border: 2px solid #0e0f10 !important;
}

.cl_chat .customtinput{
    display:unset;
}

.cl_chat .slot article{
    width: 100%;
    min-width: 400px;
    float: left;
    text-align: left;
}
.cl_chat .title_custom{
    width: 100%;
}

.js-chat .titleframe_custom{
    line-height: unset;
    display: flex;
    align-items: center;
    position: relative;
    letter-spacing: 0.5px;
}
.channels-ul li{
    float: left;
    width: fit-content;
    position: relative;
    padding: 0px 20px 0px 17px;
    border-radius: 0px;
    margin-right: 2px;
    background-color: rgb(41 48 58 / 55%);
    color: white;
    cursor: pointer;

}
.frame.svelte-1jc1d13{
    height:100%;
}

.customtinput.svelte-1jc1d13{
    min-width: 385px; 
    max-width: 385px;
}

.channels-ul{
    list-style-type: none;    
    float: left;
    margin: 0;
    padding: 0;
    overflow: hidden;
    height: 26px;
    max-width: 400px;
}
.channels-ul li .svgicon{
    height: 7px;
    vertical-align: -1px;
    padding: 0;
    margin:0;
    display:none; 
    position: relative;
}

div.container.svelte-sh553q{
    z-index: 999 !important;
}
.cl_itemlookup_listed_list{
    width: 100%;
    float: left;
    padding: 0;
}
.container.svelte-1jc1d13.svelte-1jc1d13{
    display: block;
}    
.lowercontainer.svelte-1jc1d13{
    min-width: 400px;
    max-width: 400px;
}

.versiondiv{
    bottom: 0;
    position: absolute;
    margin: 0;
    font-size: 8px;
    color: #35e0e891;
    padding: 6px;
}

.btnbar .btn{
    border-radius: 0px;
    background-color: #181d24;    
    border: 1px solid black;
    color: #e2e2e2;

}

.btnbar .btn:hover{
    border:1px solid #cbfaf3 !important;
    background-color:rgba(16, 19, 29, 0.8) !important;
}

.panel.context{
    border-radius: 0px;
    background-color: #181d24;    
    border: 1px solid black;
}
.btn.svelte-1jc1d13{
    border-radius: 0px;
    background-color: #181d24;    
    border: 1px solid black;
}

.btn.svelte-1jc1d13:hover{
    border:1px solid #cbfaf3 !important;
    background-color:rgba(16, 19, 29, 0.8) !important;
}

.marg-top.container.panel-black.svelte-1npf5af{
    z-index: 99;
}

#uftarget .panel-black .bar:first-child, #ufplayer .panel-black .bar:first-child{
    height: 80%;
}

.bar.dark.svelte-i7i7g5{
    height: 20%;
}

.chatlookupable, 
.chatlookupable .linewrap .textparty:not(.content), 
.chatlookupable .linewrap .textclan:not(.content), 
.chatlookupable .linewrap .textfaction:not(.content), 
.chatlookupable .linewrap .textglobal:not(.content), 
.chatlookupable .linewrap .textto:not(.content), 
.chatlookupable .linewrap .textfrom:not(.content), 
.chatlookupable .linewrap .textGM:not(.content)  {
    color:#FFF !important;    
    pointer-events: all;
    cursor: pointer;
}

.chatlookupable:hover{
    color:red;
}

.cl_itemlookupitemwindow,  .cl_itemlookupitemwindow .titleframe {
    background-color: #10131d;
}

#expbar .bar{    
    pointer-events: all;
}

.formatted, input[type="number"], input[type="text"], input[type="search"], input[type="color"], textarea, select {
    padding: 3px 8px;
    background-color: #181d24;
    border: 1px solid black;
}

.btn.checkbox.active {
    background-color: #ffffff;
    border: 1px solid #000000;
    box-shadow: inset 0px 0px 0px 3px #181d24;
}

.l-upperLeftModal.container.svelte-afakdv{
    max-width: 50%;
}

.comparePack{
    float:left;
    padding: 10px;
    width: 240px;
}
.cl_itemlookComparewindow .slot{
    min-height: 260px;
    height: fit-content;
}
.combsplit{
    float:left;
}

.partyinviteclanmember{
    pointer-events: all;
}

.clanView table{
    width: 80%;
    float:left;
}
.clanView table.inviteClan{
    width: 20%;
    float:left;
}

.clanView table.inviteClan td{
    padding: 4px;
}

.playerlist td{
    max-width: 50px;
}

.playerlist .pirMaxModif{
    max-width: 100px;
}


.playerlist .pirMaxModif .btn{
    padding-left: 1rem;
    padding-right: 1rem;
}

.emoteCorScale{
    position: relative;
    max-height: 18px;
    vertical-align: bottom;
    bottom:0;
}

#chat{
    height: auto;
    width: auto;
}
.container.svelte-16y0b84.svelte-16y0b84{
    max-width: unset;
    max-height: unset;
    min-width:unset;
}

.inputcolor_selectedpartyborder{
    padding:0;
}

.svelte-uxs0uj .svelte-yjs4p5{
    width: 350px;
    max-width: 350px;
}

.svelte-46w0ts .svelte-yjs4p5{
    width: 360px;
    max-width: 360px;
}


.svelte-afakdv .svelte-yjs4p5{
    width: 835px;
    max-width: 835px;
}

.svelte-voya4q .svelte-yjs4p5{
    width: 270px;
    max-width: 270px;
}

#uftarget .iconcontainer .pclass.icon{
    right: 0;
    z-index: 99;
    left: unset;
}
    </style>`;