# Настройка домена

Поставщик услуг [компания PS](https://console.ps.kz)

Сервис публикаций [Netlify](https://app.netlify.com/sites/)

## Привязка домена

> Предварительно покупается домен и настраивается публикация на Netlify.

На стороне Netlify:

1. На странице [обзора сайта](https://app.netlify.com/sites/rollmove/overview) - добавить зарегистрированный домен. При этом так же добавятся настройки DNS на стороне Netlify (для root и www, можно увидеть в [разделе Domains](https://app.netlify.com/teams/barindwalin/dns/rollmove.kz#dns-settings)).
2. Получить список серверов имен на странице аккаунта в [разделе Domains](https://app.netlify.com/teams/barindwalin/dns/rollmove.kz). Могут отличаться в зависимости от региона.

На стороне регистратора доменных имен:

1. В разделе [доменов](https://console.ps.kz/domains) в списке найти добавленный ранее домен и открыть настройки. В меню выбрать пункт `Name-серверы`. Поменять на `Персональные Name-серверы`, указав все полученные на стороне Netlify имена.
2. DNS-зоны настраивать не нужно.


После всех настроек нужно подождать от 4х часов пока изменения вступят в силу. В разделе доменов Netlify [HTTPS](https://app.netlify.com/sites/rollmove/domain-management#https) для `SSL/TLS certificate` должна появиться настройка `Your site has HTTPS enabled`.

Иначе не без сертификата SSL сайт не откроется по https. 

## Диагностирование проблем

[DNS checker](https://dnschecker.org/#A/rollmove.kz)

[SSL checker](https://www.sslshopper.com/ssl-checker.html#hostname=https://rollmove.kz)