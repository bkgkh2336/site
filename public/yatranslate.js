/*!***************************************************
 * yatranslate.js v1.0.0
 * Кастомный виджет Яндекс.Переводчик
 *****************************************************/

const yatranslate = {
    /* Исходный язык */
    lang: "ru",
};

document.addEventListener('DOMContentLoaded', function () {
    // Запуск
    yaTranslateInit();
})

function yaTranslateInit() {
    // Подключаем виджет yandex translate
    let script = document.createElement('script');
    script.src = `https://translate.yandex.net/website-widget/v1/widget.js?widgetId=ytWidget&pageLang=${yatranslate.lang}&widgetTheme=light&autoMode=false`;
    document.getElementsByTagName('head')[0].appendChild(script);

    // Получаем и записываем язык на который переводим
    let code = yaTranslateGetCode();

    // Показываем текущий язык в меню
    yaTranslateHtmlHandler(code);

    // Вешаем событие клик на языки
    yaTranslateEventHandler('click', '[data-ya-lang]', function (el) {
        yaTranslateSetLang(el.getAttribute('data-ya-lang'));
        // Перезагружаем страницу
        window.location.reload();
    })
}

function yaTranslateSetLang(lang) {
    // Записываем выбранный язык в localStorage 
    localStorage.setItem('yt-widget', JSON.stringify({
        "lang": lang,
        "active": true
    }));
}

function yaTranslateGetCode() {
    // Возвращаем язык на который переводим
    return (localStorage["yt-widget"] != undefined && JSON.parse(localStorage["yt-widget"]).lang != undefined) ? JSON.parse(localStorage["yt-widget"]).lang : yatranslate.lang;
}

function yaTranslateHtmlHandler(code) {
    // Обновляем активный язык в интерфейсе
    const activeElement = document.querySelector('[data-lang-active]');
    if (activeElement) {
        activeElement.setAttribute('data-current-lang', code);
    }
    
    // Удаляем текущий язык из списка выбора
    const currentLangElement = document.querySelector(`[data-ya-lang="${code}"]`);
    if (currentLangElement && currentLangElement.parentElement) {
        currentLangElement.parentElement.style.display = 'none';
    }
}

function yaTranslateEventHandler(event, selector, handler) {
    document.addEventListener(event, function (e) {
        let el = e.target.closest(selector);
        if (el) handler(el);
    });
}