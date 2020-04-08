// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
function init(){

  
    // Создание карты.
    var myMap = new ymaps.Map("map", {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [55.747999, 37.590484],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 14,
        controls: [
          'geolocationControl',
          'zoomControl'
        ]
    });
    let tabletsMedia = window.matchMedia('(max-width: 768px)');
    let phonesMedia = window.matchMedia('(max-width: 480px)');
    if(tabletsMedia.matches) myMap.setZoom(13);
    if(phonesMedia.matches) myMap.setZoom(12);
        
    var coords = [
      [55.751999, 37.576133],
      [55.751025, 37.602054],
      [55.758637, 37.620965],
      [55.759226, 37.580482],
      [55.742800, 37.580583]
    ];
    
    var myCollection = new ymaps.GeoObjectCollection({}, {
      draggable: false, // и их можно перемещать
      iconLayout: 'default#image',
      iconImageHref: 'svg/marker.svg',
      iconImageSize: [46, 57],
      iconImageOffset: [-35, -52]
    });
    
    var control = myMap.controls.get('routePanelControl');
    
    //Получение координат местоположения пользователя
    const location = ymaps.geolocation;
    var userCoodinates;
    location.get().then(
      function(result) {
        // Получение местоположения пользователя.
        userCoodinates = result.geoObjects.get(0).geometry.getCoordinates();
        myMap.geoObjects.add(result.geoObjects)
      },
      function(err) {
        console.log('Ошибка: ' + err)
      }
    );

    for (let i = 0; i < coords.length; i++) {
      myCollection.add(new ymaps.Placemark(coords[i]));
      
      myCollection.get(i).events.add('click', function(e){

        
        const thisPlacemark = e.get('target');
        const markCoords = thisPlacemark.geometry.getCoordinates();
        
        //Добавление балуна с адресом
        getAddress(thisPlacemark, markCoords);
        
        setTimeout(()=>{
          const setRouteBtn = document.querySelector('#setRoute');

        if(setRouteBtn) {
          setRouteBtn.addEventListener ('click', ()=> {

          var multiRoute = new ymaps.multiRouter.MultiRoute({   
            // Точки маршрута. Точки могут быть заданы как координатами, так и адресом. 
              referencePoints: [userCoodinates, markCoords]
            }, {
                // Автоматически устанавливать границы карты так,
                // чтобы маршрут был виден целиком.
                boundsAutoApply: true
            });
                
                // Добавление маршрута на карту.
                myMap.geoObjects.add(multiRoute);
          });
        }
      }, 1000)

      }).add('mouseenter', function (event) {
        var geoObject = event.get('target');
        myMap.hint.open(geoObject.geometry.getCoordinates(), "Нажмите для инфо");

    })
    // Скрываем хинт при выходе курсора за пределы метки.
    .add('mouseleave', function (event) {
        myMap.hint.close(true);
    });
    }
         
    myMap.geoObjects.add(myCollection);
}

function getAddress(myPlacemark, coords) {
  myPlacemark.properties.set('iconCaption', 'поиск...');
  ymaps.geocode(coords).then(function (res) {
      var firstGeoObject = res.geoObjects.get(0);

      myPlacemark.properties
          .set({
              // Формируем строку с данными об объекте.
              iconCaption: [
                  // Название населенного пункта или вышестоящее административно-территориальное образование.
                  firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                  // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
                  firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
              ].filter(Boolean).join(', '),
              // В качестве контента балуна задаем строку с адресом объекта.
              balloonContent: `<h3 style='margin-bottom:1rem'>${firstGeoObject.getAddressLine()}</h3>
                               <button type='button' class='button' style='padding:10px;
                               font-size:12px; font-weight:normal' id='setRoute'>Проложить маршрут</button>`
          });
  });

 
}


ymaps.ready(init);

//Глоб. переменная, с помощью которой отключается onePageScroll
//В файле one_page_scroll.js 
var DISABLE_ONE_PAGE_SCROLL = false;

const mapOverlay = document.querySelector('#mapOverlay');
const mainPagination = document.querySelector('#mainPagination');

mapOverlay.addEventListener('click', (e) => {
  mapOverlay.classList.toggle('contacts__overlay--closed');
  if(mapOverlay.classList.contains('contacts__overlay--closed')) {
    DISABLE_ONE_PAGE_SCROLL = true;
    mapOverlay.title = 'Закрыть карту';
    mainPagination.style.display = 'none';
    
    //Глоб. перем-я, содержит кнопку гамбургер-меню
    HAM_BTN.style.display = 'none';
  } else {
    DISABLE_ONE_PAGE_SCROLL = false;
    mapOverlay.title = 'Открыть карту';
    mainPagination.style.display = '';
    HAM_BTN.style.display = '';
  }
})

