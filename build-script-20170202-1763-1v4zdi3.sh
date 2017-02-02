#!/bin/bash

source /opt/local/gnocci/script/build-support.sh

eval_knieval rbenv\ update\ \>\ /dev/null
eval_knieval rbenv\ download\ 2.1.5\ \&\&\ rbenv\ use\ 2.1.5\ \&\&\ rbenv\ rehash
eval_knieval ./deploy\ production
