// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
function init(){
    // Создание карты.
    var myMap = new ymaps.Map("map", {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [55.748320, 37.606371],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 13.5,
        controls: [
          'geolocationControl',
          'routeButtonControl',
          'zoomControl'
        ]
    });

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

    for (let i = 0; i < coords.length; i++) {
      myCollection.add(new ymaps.Placemark(coords[i]));
      myCollection.get(i).events.add('click', function(e){

        var location = ymaps.geolocation.get();
        console.log(location);
        
      })
    }
         
    myMap.geoObjects.add(myCollection);

    myMap.behaviors.disable('scrollZoom');
}

ymaps.ready(init);

