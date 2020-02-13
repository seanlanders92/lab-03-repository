$.ajax('data/page-2.json', {method: 'GET', dataType: 'JSON'})
    .then(data => {
        data.forEach(element => {
            new Monster(element).render();
        })
        menuRender();
    })

 const keywordsDropDown = [];

 const keywordsFunction = (stringValue) => {
     let add = true;
     keywordsDropDown.forEach(element => {
         
         if(element === stringValue){
            add = false;

        }
    })
        if(add === true){
            keywordsDropDown.push(stringValue);
        }
 }
 let monsterArr = [];

function Monster(obj){
    this.image = obj.image_url;
    this.title = obj.title;
    this.description = obj.description;
    this.keyword = obj.keyword;
    this.horns = obj.horns;

    keywordsFunction(this.keyword);
    monsterArr.push(this);
}

Monster.prototype.render = function(){
    const templateSource = $('#photo-template').html();

    const myTemplate = Handlebars.compile(templateSource);
    // const $myTemplate = $('<section></section>').attr('class', this.keyword);
    
    let stringPara = this.description + '. There are ' + this.horns + ' horn(s) on the ' + this.title + '.';

    const context = { keyword: this.keyword, title: this.title, image: this.image, keyword: this.keyword, description: stringPara};

    const html = myTemplate(context);
    $('main').append(html);
    // $myTemplate.html(templateSource);

    // $myTemplate.find('h2').text(this.title);

    // $myTemplate.find('img').attr('src', this.image);

    // $myTemplate.find('img').attr('alt', this.keyword);

    // $myTemplate.find('p').text(this.description + '. There are ' + this.horns + ' horn(s) on the ' + this.title + '.');

    // $('main').append($myTemplate);
}

const menuRender =() => {   

    keywordsDropDown.forEach(element => {

        let $selectTag = $('<option></option>');
        $selectTag.attr('value', element).text(element);
        $('#menu').append($selectTag);
    })
}

$('#sort').change(function () {
    // $(document).ready();
    //change style
    // $('section').filter(event.target.value)


    if (event.target.value === 'horns') {
        monsterArr.sort((a, b) => {
            if (a.horns > b.horns) {
                return 1;
            } else if (a.horns < b.horns) {
                return -1;
            } else {
                return 0;
            }
        })
    } else if (event.target.value === 'name') {
        monsterArr.sort((a, b) => {
            if (a.title > b.title) {
                return 1;
            } else if (a.title < b.title) {
                return -1;
            } else {
                return 0;
            }

            // $('section').hide();
            // $(`.${event.target.value}`).show();
            // // let x = $(e.target.getAttribute('value'))
            // // $(x).show();
        })
    }
    console.log(monsterArr);
    $('section').empty();
    monsterArr.forEach(element => {
        element.render();
    })
})