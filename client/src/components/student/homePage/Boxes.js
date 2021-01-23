import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCommentAlt,
    faCalendar,
    faPoll,
    faBookReader,
    faChalkboardTeacher,
    faListAlt,
    faStickyNote,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
const box = [
    { name: "Chat", icon: faCommentAlt },
    { name: "Time Table", icon: faCalendar },
    { name: "Polls", icon: faPoll },
    { name: "Study Material", icon: faBookReader },
    { name: "Online Class", icon: faChalkboardTeacher },
    { name: "Results", icon: faListAlt },
    { name: "Assignments", icon: faStickyNote }
];
export default function Boxes() {
    let history = useHistory();
    const user = useSelector(state => state.user);
    const theme = user.theme;
    const red0 = e => {
        history.push("/student/" + box[0].name);
    };
    const red1 = e => {
        history.push("/student/" + box[1].name);
    };
    const red2 = e => {
        history.push("/student/" + box[2].name);
    };
    const red3 = e => {
        history.push("/student/" + box[3].name);
    };
    const red4 = e => {
        history.push("/student/" + box[4].name);
    };
    const red5 = e => {
        history.push("/student/" + box[5].name);
    };
    const red6 = e => {
        history.push("/student/" + box[6].name);
    };
    const light = (
        <React.Fragment>
            <span
                md={4}
                className="box d-flex justify-content-center light2"
                id={box[0].name}
                onClick={red0}
                key={box[0].name}
                name={box[0].name}
            >
                <FontAwesomeIcon
                    icon={box[0].icon}
                    size="4x"
                    className="tpm"
                    id={box[0].name}
                    key={box[0].name}
                    name={box[0].name}
                    onClick={red0}
                />
                <h6
                    className="btm"
                    id={box[0].name}
                    name={box[0].name}
                    onClick={red0}
                >
                    {box[0].name}
                </h6>
            </span>
            <span
                md={4}
                className="box d-flex justify-content-center light2"
                id={box[1].name}
                onClick={red1}
                key={box[1].name}
                name={box[1].name}
            >
                <FontAwesomeIcon
                    icon={box[1].icon}
                    size="4x"
                    className="tpm"
                    id={box[1].name}
                    key={box[1].name}
                    name={box[1].name}
                    onClick={red1}
                />
                <h6
                    className="btm"
                    id={box[1].name}
                    name={box[1].name}
                    onClick={red1}
                >
                    {box[1].name}
                </h6>
            </span>
            <span
                md={4}
                className="box d-flex justify-content-center light2"
                id={box[2].name}
                onClick={red2}
                key={box[2].name}
                name={box[2].name}
            >
                <FontAwesomeIcon
                    icon={box[2].icon}
                    size="4x"
                    className="tpm"
                    id={box[2].name}
                    key={box[2].name}
                    name={box[2].name}
                    onClick={red2}
                />
                <h6
                    className="btm"
                    id={box[2].name}
                    name={box[2].name}
                    onClick={red2}
                >
                    {box[2].name}
                </h6>
            </span>
            <span
                md={4}
                className="box d-flex justify-content-center light2"
                id={box[3].name}
                onClick={red3}
                key={box[3].name}
                name={box[3].name}
            >
                <FontAwesomeIcon
                    icon={box[3].icon}
                    size="4x"
                    className="tpm"
                    id={box[3].name}
                    key={box[3].name}
                    name={box[3].name}
                    onClick={red3}
                />
                <h6
                    className="btm"
                    id={box[3].name}
                    name={box[3].name}
                    onClick={red3}
                >
                    {box[3].name}
                </h6>
            </span>
            <span
                md={4}
                className="box d-flex justify-content-center light2"
                id={box[4].name}
                onClick={red4}
                key={box[4].name}
                name={box[4].name}
            >
                <FontAwesomeIcon
                    icon={box[4].icon}
                    size="4x"
                    className="tpm"
                    id={box[4].name}
                    key={box[4].name}
                    name={box[4].name}
                    onClick={red4}
                />
                <h6
                    className="btm"
                    id={box[4].name}
                    name={box[4].name}
                    onClick={red4}
                >
                    {box[4].name}
                </h6>
            </span>
            <span
                md={4}
                className="box d-flex justify-content-center light2"
                id={box[5].name}
                onClick={red5}
                key={box[5].name}
                name={box[5].name}
            >
                <FontAwesomeIcon
                    icon={box[5].icon}
                    size="4x"
                    className="tpm"
                    id={box[5].name}
                    key={box[5].name}
                    name={box[5].name}
                    onClick={red5}
                />
                <h6
                    className="btm"
                    id={box[5].name}
                    name={box[5].name}
                    onClick={red5}
                >
                    {box[5].name}
                </h6>
            </span>
            <span
                md={4}
                className="box d-flex justify-content-center light2"
                id={box[6].name}
                onClick={red6}
                key={box[6].name}
                name={box[6].name}
            >
                <FontAwesomeIcon
                    icon={box[6].icon}
                    size="4x"
                    className="tpm"
                    id={box[6].name}
                    key={box[6].name}
                    name={box[6].name}
                    onClick={red6}
                />
                <h6
                    className="btm"
                    id={box[6].name}
                    name={box[6].name}
                    onClick={red6}
                >
                    {box[6].name}
                </h6>
            </span>
        </React.Fragment>
    );
    const dark = (
        <React.Fragment>
            <span
                md={4}
                className="box d-flex justify-content-center dark2"
                id={box[0].name}
                onClick={red0}
                key={box[0].name}
                name={box[0].name}
            >
                <FontAwesomeIcon
                    icon={box[0].icon}
                    size="4x"
                    className="tpm text-white"
                    id={box[0].name}
                    key={box[0].name}
                    name={box[0].name}
                    onClick={red0}
                />
                <h6
                    className="btm dark-color"
                    id={box[0].name}
                    name={box[0].name}
                    onClick={red0}
                >
                    {box[0].name}
                </h6>
            </span>
            <span
                md={4}
                className="box d-flex justify-content-center dark2"
                id={box[1].name}
                onClick={red1}
                key={box[1].name}
                name={box[1].name}
            >
                <FontAwesomeIcon
                    icon={box[1].icon}
                    size="4x"
                    className="tpm text-white"
                    id={box[1].name}
                    key={box[1].name}
                    name={box[1].name}
                    onClick={red1}
                />
                <h6
                    className="btm dark-color"
                    id={box[1].name}
                    name={box[1].name}
                    onClick={red1}
                >
                    {box[1].name}
                </h6>
            </span>
            <span
                md={4}
                className="box d-flex justify-content-center dark2"
                id={box[2].name}
                onClick={red2}
                key={box[2].name}
                name={box[2].name}
            >
                <FontAwesomeIcon
                    icon={box[2].icon}
                    size="4x"
                    className="tpm text-white"
                    id={box[2].name}
                    key={box[2].name}
                    name={box[2].name}
                    onClick={red2}
                />
                <h6
                    className="btm dark-color"
                    id={box[2].name}
                    name={box[2].name}
                    onClick={red2}
                >
                    {box[2].name}
                </h6>
            </span>
            <span
                md={4}
                className="box d-flex justify-content-center dark2"
                id={box[3].name}
                onClick={red3}
                key={box[3].name}
                name={box[3].name}
            >
                <FontAwesomeIcon
                    icon={box[3].icon}
                    size="4x"
                    className="tpm text-white"
                    id={box[3].name}
                    key={box[3].name}
                    name={box[3].name}
                    onClick={red3}
                />
                <h6
                    className="btm dark-color"
                    id={box[3].name}
                    name={box[3].name}
                    onClick={red3}
                >
                    {box[3].name}
                </h6>
            </span>
            <span
                md={4}
                className="box d-flex justify-content-center dark2"
                id={box[4].name}
                onClick={red4}
                key={box[4].name}
                name={box[4].name}
            >
                <FontAwesomeIcon
                    icon={box[4].icon}
                    size="4x"
                    className="tpm text-white"
                    id={box[4].name}
                    key={box[4].name}
                    name={box[4].name}
                    onClick={red4}
                />
                <h6
                    className="btm dark-color"
                    id={box[4].name}
                    name={box[4].name}
                    onClick={red4}
                >
                    {box[4].name}
                </h6>
            </span>
            <span
                md={4}
                className="box d-flex justify-content-center dark2"
                id={box[5].name}
                onClick={red5}
                key={box[5].name}
                name={box[5].name}
            >
                <FontAwesomeIcon
                    icon={box[5].icon}
                    size="4x"
                    className="tpm text-white"
                    id={box[5].name}
                    key={box[5].name}
                    name={box[5].name}
                    onClick={red5}
                />
                <h6
                    className="btm dark-color"
                    id={box[5].name}
                    name={box[5].name}
                    onClick={red5}
                >
                    {box[5].name}
                </h6>
            </span>
            <span
                md={4}
                className="box d-flex justify-content-center dark2"
                id={box[6].name}
                onClick={red6}
                key={box[6].name}
                name={box[6].name}
            >
                <FontAwesomeIcon
                    icon={box[6].icon}
                    size="4x"
                    className="tpm text-white"
                    id={box[6].name}
                    key={box[6].name}
                    name={box[6].name}
                    onClick={red6}
                />
                <h6
                    className="btm dark-color"
                    id={box[6].name}
                    name={box[6].name}
                    onClick={red6}
                >
                    {box[6].name}
                </h6>
            </span>
        </React.Fragment>
    );
    return <center>{theme ? dark : light}</center>;
}
