import {MKButton, setTheme} from 'react-native-material-kit';

setTheme({
    primaryColor: '#FFB100'
});

export default function (text) {
    return MKButton.coloredButton()
        .withText(text)
        .withStyle({
            paddingLeft: 20,
            paddingRight: 20
        })
        .build();
}