import React from 'react';
import { Text, View } from 'react-native';

// Styles
import styles from './style';

// Icons
import LoginIcon from '../../icons/login.svg';
import PersonIcon from '../../icons/person.svg';
import TeacherIcon from '../../icons/teacher.svg';
import PrincipleIcon from '../../icons/principle.svg';

// Components
import Button from '../button';

const LoginComponent = (props) => {

    return (
        <View style={styles.container}>
            <View style={styles.titleWrapper}>
                <LoginIcon width={24} height={24} fill={"#000"} />
                <Text style={styles.title}>{props.screen == 1 ? "Log in as..." : "Sign up as..."}</Text>
            </View>
            <View style={styles.buttonsWrapper}>
                <Button
                    text={"Student"}
                    txtColor={"white"}
                    icon={<PersonIcon width={24} height={24} fill={"#fff"} />}
                    btnColor={"#098EB2"}
                    style={{ height: "30%" }}
                    onPress={() => props.onButtonPress({ screen: props.screen, action: "student" })}
                />
                {
                    props.screen == 2 || <><Button
                        text={"Teacher"}
                        txtColor={"white"}
                        icon={<TeacherIcon width={24} height={24} fill={"#fff"} />}
                        btnColor={"#22B2DA"}
                        style={{ height: "20%" }}
                        onPress={() => props.onButtonPress({ screen: props.screen, action: "teacher" })}
                    />
                        <Button
                            text={"Principle"}
                            txtColor={"white"}
                            icon={<PrincipleIcon width={24} height={24} fill={"#fff"} />}
                            btnColor={"#22B2DA"}
                            style={{ height: "20%" }}
                            onPress={() => props.onButtonPress({ screen: props.screen, action: "principle" })}
                        /></>
                }

            </View>
        </View>
    );
};

export default LoginComponent;
