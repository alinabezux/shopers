import React from 'react';

import { Container, Typography } from "@mui/material";

const ObminPage = () => {
    return (
        <Container sx={{ my: "30px" }}>
            <Typography variant="h5" className='title'> ОБМІН ТА ПОВЕРНЕННЯ</Typography>
            <Typography variant="h5" className='subtitle' >
                ЯК ЗДІЙСНИТИ ОБМІН
            </Typography>
            Щоб обміняти товар необхідно повідомити про це менеджера, написавши нам у Instagram @shopers_vi, щоб
            уточнити наявність бажаного товару.<br />

            Після того, як менеджер підтвердив обмін, необхідно заповнити Бланк обміну та повернення та додати його до
            посилки-обмін.<br />

            Відправте належно упаковані товари на адресу:<br />
            м. _________, відділення Нової Пошти №1<br />
            Прізвище Ім'я<br />
            +380...<br />
            <br />
            <Typography variant="h5" className='subtitle'>
                ЯК ЗДІЙСНИТИ ПОВЕРНЕННЯ
            </Typography>
            Ви можете повернути товар протягом 14 днів з моменту отримання посилки (враховуючи кілька днів на зворотню
            доставку).
            <ul>
                <li>Зв’яжіться з менеджером та повідомте про повернення, написавши нам у Instagram @shopers_vi.</li>
                <li> Заповніть Бланк обміну та повернення, який знаходився у Вашій посилці при отриманні.</li>
                <li>Упакуйте належним чином товари, які бажаєте повернути, щоб запобігти їх пошкодженню під час
                    пересилання.
                </li>
                <li>Додайте до посилки-повернення заповнений Бланк обміну та повернення.</li>
                <li>Відправте упаковані товари на адресу:<br />
                    м. _________, відділення Нової Пошти №1<br />
                    Прізвище Ім'я<br />
                    +380...<br />
                </li>
            </ul>


            <b>ВАЖЛИВО!</b><br /> Послуги за доставки повернення товару сплачує клієнт. Посилка, доставка якої не
            сплачена, повернеться назад до вас.<br />

            Після отримання повернення на нашому складі, протягом 5-х робочих днів вам буде надіслано грошовий переказ
            на рахунок, який ви вказали у Бланці обміну та повернення або на ту карту, з якої була здійснена оплата
            онлайн.<br />
            <br />
            <b>ДОДАТКОВА ІНФОРМАЦІЯ</b><br />
            Ми приймаємо повернення товарів у яких збережений товарний вигляд та наявні всі бірки.
            Ми не несемо відповідальності за будь-які товари, які були повернуті нам помилково.

            По всіх питаннях звертайтеся за номером +380...

        </Container>
    );
};

export { ObminPage };