import random
import string
from django.utils.text import slugify
'''
random_string_generator is located here:
http://joincfe.com/blog/random-string-generator-in-python/
'''


def unique_slug_generator(instance, new_slug=None):
    DO_NOT_USE = ['new-blog']
    """
    This is for a Django project and it assumes your instance 
    has a model with a slug field and a title character (char) field.
    """
    if new_slug is not None: slug = new_slug
    else: slug = slugify(instance.title[:100])

    Klass = instance.__class__
    qs_exists = Klass.objects.filter(slug=slug).exists() or (slug in DO_NOT_USE)
    if qs_exists:
        new_slug = "{randstr}".format(
                    slug=slug,
                    randstr=random_string_generator(size=100)
                )
        return unique_slug_generator(instance, new_slug=new_slug)
    return slug



def random_string_generator(size=3, chars=string.ascii_lowercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))


