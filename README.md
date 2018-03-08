Hello!

It's simple weather app built with react that uses [openweathermap.org](openweathermap.org) api to get weather and has multilang support (currently, I've got only Russian and English languages. If you want, you can add your translation with push request)

If you want to use it, please get your own api key as the one used here will be blocked after reaching 60 reqs per minute.

Also, it's still work-in-progress, so follow me if you liked it :D I'm just doing it for fun and to get known with react.


Currently, you can have the following settings:
for <Weather />
moreInfo={['windSpeed','windDir','seaLevel','pressure','humidity','clouds','snow','rain']} <- these are specified(you can delete any) if you want to see some additional information. I guess it's all pretty clear what each thing does.
apiKey  <- this is your api key that you should get in order to get weather. Mine is working, but can be blocked anytime :)

for <Regions /> you can set the following options
city <- this is default city  that should be displayed. However, we do support few things:
---We keep the last city that you had. so you can easily pass it >> {localStorage.getItem('city')}
---if you want to have some city by default, you can pass "your city name", then it'll be shown
---if you want to automatically detect city based on user's ip, pass "auto"
---you can combine any of them, e.g. {localStorage.getItem('city') || "Tomsk"} to get latest city, or if user came in for the first time - to show default city (e.g. "Tomsk")

By default data is being parsed every 30 mins automatically. You can change in in constructor of <Regions />
