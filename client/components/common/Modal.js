import React from 'react';
import PropTypes from 'prop-types';

export default function Modal({ paragraphs, className }) {
    const lorem = [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a convallis orci. Praesent ac felis ac odio scelerisque vehicula. Vivamus quis tristique quam. Sed et laoreet sapien. Praesent non elit nisl. Suspendisse fringilla cursus ante id varius. Duis commodo varius tellus, a sollicitudin nisi viverra nec. Nulla facilisi. Sed facilisis augue eu magna varius mollis. Sed molestie sapien quis sapien iaculis mattis. Nulla vestibulum dapibus massa condimentum rhoncus. Proin tempus suscipit laoreet. Mauris vel ultricies nulla.',
        'Morbi eu leo non massa euismod ultricies. Nunc placerat eros nisi, quis scelerisque massa consequat id. Nunc interdum consequat sollicitudin. Pellentesque aliquet est arcu, sit amet faucibus nisi aliquet vel. Morbi dignissim molestie lectus laoreet cursus. Vivamus vulputate risus eu metus consequat, ut fringilla libero interdum. Nunc rhoncus dictum congue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean at sodales ligula, eget tincidunt quam. Duis quis purus lectus. Vestibulum mauris quam, fringilla ut lobortis in, feugiat vel massa.',
        'Vestibulum felis nibh, tristique condimentum tellus vel, egestas pharetra lorem. Proin fermentum volutpat tortor. Nullam at ipsum tincidunt, cursus diam ut, tincidunt nisl. Suspendisse tempus nisi eu augue tempor cursus. Nam malesuada, arcu in varius tincidunt, massa est pretium risus, ac maximus tortor eros imperdiet justo. Praesent aliquet ante quis ultricies eleifend. In pharetra ante eu dignissim rutrum. Fusce sit amet tempor urna, id iaculis lectus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed maximus in ante vel eleifend.',
        'Curabitur scelerisque ornare urna id auctor. Vivamus accumsan posuere risus eu rhoncus. Nullam est lacus, tempus at velit sed, porta euismod eros. Donec commodo est eget malesuada finibus. Proin eu efficitur quam. Nunc elementum turpis a congue commodo. Donec eget lacinia lacus, a vestibulum quam.',
        'Curabitur convallis posuere arcu, sit amet pretium quam pulvinar non. Integer efficitur orci ac neque tristique, non tempor massa feugiat. Sed eu odio arcu. Pellentesque semper felis vitae nulla tincidunt, gravida imperdiet dui gravida. Cras lorem augue, mollis ut odio a, interdum hendrerit ipsum. Nulla commodo auctor molestie. Suspendisse aliquam mi vitae dui egestas, eu molestie dolor iaculis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer maximus sodales pulvinar. Donec ultricies nisi non efficitur ornare. Nunc sodales erat vitae elit luctus, vel pulvinar leo consequat. Vivamus eget metus pretium, fringilla massa non, aliquam purus. Quisque ligula mi, dapibus sed libero a, vestibulum consectetur nisi. Sed laoreet ullamcorper nisi, a scelerisque augue tincidunt in.',
    ]

    return (
        <div className={ className }>
            { lorem.map((paragraph, index) => {
                if ((index + 1) > paragraphs) {
                    return;
                }

                return (
                    <p key={`para-${index}`}>{ paragraph }</p>
                )
            })}
        </div>
    )
}

PlaceholderText.propTypes = {
    paragraphs: PropTypes.number,
    className: PropTypes.string
}

PlaceholderText.defaultProps = {
    paragraphs: 3
}