//폰트 설정 참조 https://velog.io/@greatasher7/React-Typescript-Setup-without-CRA-5-Font-%EC%84%A4%EC%A0%95

// GlobalFont.ts
import { createGlobalStyle } from "styled-components";
// 각 폰트 파일 import
import Font_BK from "../Assets/Fonts/NotoSansKR-Black.woff";
import Font_B from "../Assets/Fonts/NotoSansKR-Bold.woff";
import Font_M from "../Assets/Fonts/NotoSansKR-Medium.woff";
import Font_R from "../Assets/Fonts/NotoSansKR-Regular.woff";
import Font_T from "../Assets/Fonts/NotoSansKR-Thin.woff";
import Font_BI from "../Assets/Fonts/Roboto-BlackItalic.woff";

export const GlobalFont = createGlobalStyle`
    @font-face {
        font-family: "NotoSansKR";
        src: url(${Font_BK}) format('woff'); 
        font-weight: 900;
    }
    @font-face {
        font-family: "NotoSansKR";
        src: url(${Font_B}) format('woff'); 
        font-weight: 700;
    }
    @font-face {
        font-family: "NotoSansKR";
        src:  url(${Font_M}) format('woff'); 
        font-weight: 400;
    }
    @font-face {
        font-family: "NotoSansKR";
        src: url(${Font_R}) format('woff'); 
        font-weight: 300;
    }
    @font-face {
        font-family: "NotoSansKR";
        src: url(${Font_T}) format('woff'); 
        font-weight: 100;
    }
    @font-face {
        font-family: "NotoSansKR";
        src:  url(${Font_T}) format('woff'); 
        font-weight: 100;
    }
    @font-face {
        font-family: "Roboto";
        src: url(${Font_BI}) format('woff'); 
        font-weight: 900;
    }
`;
