import React, { useState } from "react";
import { IonPage, IonContent, IonItem, IonInput, IonButton } from "@ionic/react";
import { useHistory } from "react-router";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const handleLogin = () => {
        if (email === "user@mail.com" && password === "123") {
            localStorage.setItem("logged", "true");
            history.push("/list");
        } else {
            console.log("Invalid credentials");
            alert("Invalid credentials.");
        }
    };

    return (
        <IonPage>
            <IonContent className="ion-padding">
                <div style={{ maxWidth: "400px", margin: "50px auto" }}>
                    <IonItem lines="none">
                        <h2 style={{ width: "100%", textAlign: "center" }}>Login</h2>
                    </IonItem>
                    <IonItem>
                        <IonInput
                            type="email"
                            placeholder="Email"
                            value={email}
                            onIonChange={(e: any) => setEmail(e.detail.value!)}
                        />
                    </IonItem>
                    <IonItem>
                        <IonInput
                            type="password"
                            placeholder="Password"
                            value={password}
                            onIonChange={(e: any) => setPassword(e.detail.value!)}
                        />
                    </IonItem>
                    <IonButton expand="block" onClick={handleLogin} className="ion-margin-top">
                        Login
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Login;
