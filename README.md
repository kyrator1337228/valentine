## Сайт‑валентинка (готовая ссылка)

Это статический сайт (HTML/CSS/JS). Его можно **задеплоить** и отправить ссылку.

### Как открыть локально

Из папки проекта:

```bash
cd /Users/aleksey/HSE/valentine-site
python3 -m http.server 8000
```

Открой в браузере `http://localhost:8000`.

### Как настроить текст через ссылку

Параметры:
- `to` — кому
- `from` — от кого
- `msg` — сообщение

Пример:
`/index.html?to=Саше&from=Лёши&msg=Ты%20делаешь%20мои%20дни%20теплее`

Можно также нажать кнопку **Настроить** на странице и скопировать готовую ссылку.

### Деплой на GitHub Pages (самый простой)

1) Создай репозиторий на GitHub, например `valentine`.
2) В терминале:

```bash
cd /Users/aleksey/HSE/valentine-site
git init
git add .
git commit -m "valentine"
git branch -M main
git remote add origin <SSH_ИЛИ_HTTPS_ССЫЛКА_НА_РЕПО>
git push -u origin main
```

3) На GitHub: **Settings → Pages**
- Source: `Deploy from a branch`
- Branch: `main` / `/ (root)`
- Save

Через минуту появится ссылка вида:
`https://<username>.github.io/<repo>/`

### Деплой на Netlify (без git)

1) Открой Netlify и выбери **Add new site → Deploy manually**.
2) Перетащи папку `/Users/aleksey/HSE/valentine-site` в окно загрузки.
3) Получишь ссылку сразу.


