#! /bin/sh
#
# publish.sh
# Copyright (C) 2022 sandvich <sandvich@archtop>
#
# Distributed under terms of the GPLv3 license.
#


npm run build && rsync -r --delete --progress dist/ pi:~/web/integradle/
